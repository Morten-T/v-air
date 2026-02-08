# Design Overvejelser

Alt fetching relateret functionality ligger i WeatherApi. Jeg henter det med funktioner i api'et, og så gemmer jeg det i en state i Homepage, så kan den pass det videre.

Jeg har splittet ugentlig data og current data op i 2 forskellige funktioner for at gøre det mere overskueligt hvad der sker hvor, da open-meteo har 2 distinct seperations af daily og current data.

Jeg har rounded og afskåret decimaler i api delen, fordi jeg ikke har brug for mere data noget sted i appen, og det sparer mig en masse "Math" og "toPrecision" kald.

Jeg har små checks med undervejs for at der ikke står "0 til 0 grader" eller "0 mm regn".

Det hele bliver vist i en "Homepage" component så jeg kan tilføje wrappers eller noget andet senere.

# Future improvements

- Lave en smartere måde at capitalize weekdays på
- Tilføje et Phone layout
