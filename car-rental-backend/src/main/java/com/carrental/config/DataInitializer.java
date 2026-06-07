package com.carrental.config;

import com.carrental.entity.*;
import com.carrental.repository.*;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.io.*;
import java.util.*;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final AppUserRepository userRepository;
    private final AgencyRepository agencyRepository;
    private final CarRepository carRepository;
    private final PasswordEncoder passwordEncoder;

    // Moroccan cities → { agencyName, city, region, address, phone, email }
    private static final Map<String, String[]> CITY_AGENCIES = new LinkedHashMap<>();
    static {
        CITY_AGENCIES.put("Casablanca", new String[]{
                "AutoRent Casablanca", "Casablanca", "Grand Casablanca-Settat",
                "Boulevard Mohammed V, Quartier des Habous", "+212 522-000-001", "casa@autorent.ma"});
        CITY_AGENCIES.put("Rabat", new String[]{
                "AutoRent Rabat", "Rabat", "Rabat-Salé-Kénitra",
                "Avenue Mohammed VI, Agdal", "+212 537-000-002", "rabat@autorent.ma"});
        CITY_AGENCIES.put("Marrakech", new String[]{
                "AutoRent Marrakech", "Marrakech", "Marrakech-Safi",
                "Avenue Mohammed VI, Guéliz", "+212 524-000-003", "marrakech@autorent.ma"});
        CITY_AGENCIES.put("Tanger", new String[]{
                "AutoRent Tanger", "Tanger", "Tanger-Tétouan-Al Hoceïma",
                "Avenue Prince Moulay Abdellah, Centre-Ville", "+212 539-000-004", "tanger@autorent.ma"});
        CITY_AGENCIES.put("Fes", new String[]{
                "AutoRent Fès", "Fès", "Fès-Meknès",
                "Avenue Hassan II, Ville Nouvelle", "+212 535-000-005", "fes@autorent.ma"});
    }

    private static final List<String> MOROCCAN_CITIES = new ArrayList<>(CITY_AGENCIES.keySet());

    @Override
    public void run(String... args) {
        seedUsers();
        if (agencyRepository.count() == 0) {
            Map<String, Agency> agencies = seedAgencies();
            seedCarsFromDataset(agencies);
        }
        log.info("✅  Data initialization complete — {} agencies, {} cars",
                agencyRepository.count(), carRepository.count());
    }

    // -------------------------------------------------------
    // Users
    // -------------------------------------------------------

    private void seedUsers() {
        if (userRepository.count() > 0) return;

        userRepository.save(AppUser.builder()
                .username("admin").password(passwordEncoder.encode("admin123"))
                .email("admin@autorent.ma").firstName("Admin").lastName("AutoRent")
                .role(AppUser.Role.ROLE_ADMIN).enabled(true).build());

        userRepository.save(AppUser.builder()
                .username("manager").password(passwordEncoder.encode("manager123"))
                .email("manager@autorent.ma").firstName("Youssef").lastName("Benali")
                .role(AppUser.Role.ROLE_MANAGER).enabled(true).build());

        userRepository.save(AppUser.builder()
                .username("user").password(passwordEncoder.encode("user123"))
                .email("user@gmail.com").firstName("Mehdi").lastName("El Fassi")
                .role(AppUser.Role.ROLE_USER).enabled(true).build());

        log.info("👤  Seeded 3 users: admin / manager / user");
    }

    // -------------------------------------------------------
    // Agencies
    // -------------------------------------------------------

    private Map<String, Agency> seedAgencies() {
        AppUser youssef = userRepository.findByUsername("manager")
                .orElseThrow(() -> new RuntimeException("Manager not found"));

        Map<String, Agency> result = new LinkedHashMap<>();

        for (Map.Entry<String, String[]> entry : CITY_AGENCIES.entrySet()) {
            String city = entry.getKey();
            String[] info = entry.getValue();

            Agency agency = Agency.builder()
                    .name(info[0])
                    .city(info[1])
                    .state(info[2])
                    .address(info[3])
                    .phone(info[4])
                    .email(info[5])
                    .build();


            if (city.equals("Casablanca")) {
                agency.setManager(youssef);
            }

            result.put(city, agencyRepository.save(agency));
        }
        log.info("🏢  Seeded {} agencies with manager assigned", result.size());
        return result;
    }

    // -------------------------------------------------------
    // Cars from CSV dataset
    // -------------------------------------------------------

    private void seedCarsFromDataset(Map<String, Agency> agencies) {
        List<String[]> rows = loadCsv();
        if (rows.isEmpty()) {
            log.warn("⚠️  CSV dataset not found or empty — skipping car seed");
            return;
        }

        int seeded = 0;
        int cityIndex = 0;
        Set<String> seenVins = new HashSet<>();
        Set<String> seenPlates = new HashSet<>();
        Set<String> skipBrands = Set.of("harley-davidson", "heartland", "peterbilt");
        Random rand = new Random(42);

        for (String[] row : rows) {
            if (row.length < 13) continue;
            try {
                String brand       = row[2].trim();
                String model       = row[3].trim();
                String yearStr     = row[4].trim();
                String titleStatus = row[5].trim();
                String mileageStr  = row[6].trim();
                String color       = row[7].trim();
                String vin         = row[8].trim().toLowerCase();
                String priceStr    = row[1].trim();

                if (skipBrands.contains(brand.toLowerCase())) continue;
                if (vin.isBlank() || seenVins.contains(vin)) continue;

                int priceUSD = Integer.parseInt(priceStr);
                if (priceUSD < 500 || priceUSD > 150_000) continue;

                int year = Integer.parseInt(yearStr);
                if (year < 1990 || year > 2025) continue;

                double mileage = Double.parseDouble(mileageStr.isBlank() ? "0" : mileageStr);

                // Convert USD price to MAD (1 USD ≈ 10 MAD)
                // Daily rate clamped: 200 MAD (economy) to 3000 MAD (premium), rounded to nearest 50
                double priceMAD = priceUSD * 10.0;
                double dailyRateMAD = Math.round(priceMAD / 300.0 * 10.0) / 10.0;
                dailyRateMAD = Math.max(200.0, Math.min(3000.0, dailyRateMAD));
                dailyRateMAD = Math.round(dailyRateMAD / 50.0) * 50.0;

                // Distribute cars round-robin across Moroccan cities
                String city = MOROCCAN_CITIES.get(cityIndex % MOROCCAN_CITIES.size());
                cityIndex++;

                Agency agency = agencies.get(city);
                String plate = generateUniquePlate(seeded + 1, seenPlates);

                Car car = Car.builder()
                        .brand(capitalize(brand))
                        .model(capitalize(model))
                        .year(year)
                        .vin(vin)
                        .registrationPlate(plate)
                        .mileage(mileage)
                        .dailyRate(dailyRateMAD)
                        .color(translateColor(color))
                        .status(Car.CarStatus.AVAILABLE)
                        .fuelType(randomFuelType(rand))
                        .transmission(mileage > 100_000
                                ? Car.Transmission.MANUAL
                                : (rand.nextBoolean() ? Car.Transmission.AUTOMATIC : Car.Transmission.MANUAL))
                        .numberOfDoors(rand.nextBoolean() ? 4 : 2)
                        .numberOfSeats(5)
                        .hasAirConditioning(true)
                        .hasGPS(rand.nextInt(3) == 0)
                        .titleStatus(titleStatus)
                        .originState(city)
                        .agency(agency)
                        .build();

                carRepository.save(car);
                seenVins.add(vin);
                seenPlates.add(plate);
                seeded++;

            } catch (NumberFormatException | ArrayIndexOutOfBoundsException ignored) {
                // skip malformed rows silently
            }
        }

        log.info("🚗  Seeded {} cars across Moroccan agencies", seeded);
    }

    // -------------------------------------------------------
    // CSV loader
    // -------------------------------------------------------

    private List<String[]> loadCsv() {
        String[] paths = {
                "data/USA_cars_datasets.csv",
                "/mnt/user-data/uploads/USA_cars_datasets.csv"
        };

        for (String path : paths) {
            try {
                InputStream is;
                if (path.startsWith("/")) {
                    File f = new File(path);
                    if (!f.exists()) continue;
                    is = new FileInputStream(f);
                } else {
                    ClassPathResource resource = new ClassPathResource(path);
                    if (!resource.exists()) continue;
                    is = resource.getInputStream();
                }
                try (CSVReader reader = new CSVReader(new InputStreamReader(is))) {
                    List<String[]> all = reader.readAll();
                    if (!all.isEmpty()) all.remove(0);
                    return all;
                }
            } catch (IOException | CsvException e) {
                log.debug("Could not load CSV from {}: {}", path, e.getMessage());
            }
        }
        return Collections.emptyList();
    }

    // -------------------------------------------------------
    // Helpers
    // -------------------------------------------------------

    private String capitalize(String s) {
        if (s == null || s.isBlank()) return s;
        String[] words = s.trim().toLowerCase().split("\\s+");
        StringBuilder sb = new StringBuilder();
        for (String w : words) {
            if (!w.isEmpty()) sb.append(Character.toUpperCase(w.charAt(0)))
                    .append(w.substring(1)).append(" ");
        }
        return sb.toString().trim();
    }

    /**
     * Moroccan plate format: 12345-A-1
     * number (5 digits) | letter | region code
     */
    private String generateUniquePlate(int sequence, Set<String> seenPlates) {
        String[] regions = {"1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16"};
        String[] letters = {"A","B","D","G","H","J","K"};

        String region = regions[sequence % regions.length];
        String letter = letters[sequence % letters.length];
        int number = 10000 + sequence;

        String plate = number + "-" + letter + "-" + region;
        int counter = 0;
        while (seenPlates.contains(plate)) {
            plate = (number + ++counter) + "-" + letter + "-" + region;
        }
        return plate;
    }

    /**
     * Translates English color names to French (used in Moroccan registration docs)
     */
    private String translateColor(String color) {
        if (color == null) return "Autre";
        return switch (color.trim().toLowerCase()) {
            case "white"        -> "Blanc";
            case "black"        -> "Noir";
            case "silver"       -> "Argenté";
            case "gray", "grey" -> "Gris";
            case "red"          -> "Rouge";
            case "blue"         -> "Bleu";
            case "green"        -> "Vert";
            case "brown"        -> "Marron";
            case "beige"        -> "Beige";
            case "orange"       -> "Orange";
            case "yellow"       -> "Jaune";
            case "gold"         -> "Doré";
            case "purple"       -> "Violet";
            default             -> capitalize(color);
        };
    }

    private Car.FuelType randomFuelType(Random rand) {
        int r = rand.nextInt(10);
        if (r < 5) return Car.FuelType.GASOLINE;
        if (r < 8) return Car.FuelType.DIESEL;
        if (r < 9) return Car.FuelType.HYBRID;
        return Car.FuelType.ELECTRIC;
    }
}