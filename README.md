<span style="color:blue; font-weight:bold; font-size:48px">Velkommen til V-AIR</span>.

## Sådan tjekker du vejret

Har du heller ikke nogle vinduer i din lejlighed?
Så prøv den her app og læs det flotte dashboard!

![dash](/src/assets/dash_2.png)

## Run instructions

Step 1.
Klon dette repo et vilkårligt sted på din pc (ikke downloads mappen)

Step 2.
Åben din yndlingsterminal (altså git bash) i den directory du har clonet repoet i, og kør `npm start`

Step 3.
Profit

## Sådan kører du jest tests

Kør `npm test` i terminalen i samme folder

# Design Overvejelser

Alt fetching relateret functionality ligger i `WeatherApi`. Jeg henter det med funktioner i api'et, og så gemmer jeg det i en state i `Homepage`, så kan den pass det videre

Jeg har splittet ugentlig data og current data op i 2 forskellige funktioner for at gøre det mere overskueligt hvad der sker hvor, da open-meteo har 2 distinct seperations af daily og current data

Jeg har rounded og afskåret decimaler i api delen, fordi jeg ikke har brug for mere data noget sted i appen, og det sparer mig en masse "Math" og "toPrecision" kald

Jeg har små checks med undervejs for at der ikke står "0 til 0 grader" eller "0 mm regn"

Det hele bliver vist i en "`Homepage`" component så jeg kan tilføje wrappers eller noget andet senere.
Derudover har "`CurrentDay`" delen og "`VairDay`" (altså ugeprognosen) ligeledes hver deres component for at holde `Homepage` overskuelig

# Future improvements

- Tilføje et Phone layout
- Translations til engelsk, små flag til at vælge sprog

# Total hours spent: 9
