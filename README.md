# DustBustersUnited
Project is being developed for educational purposes for SUVNET22 with fellow classmates! 

Working on an App that will help organize homes with a todo fashion!

Team: Marcus, Johan, Omar, Mohammed and Khaled


# Installation
1. Clona repon
2. Skapa en fil /Client/.env enligt nedan:
```
EXPO_PUBLIC_API_URL=https://dustbusters.space/api
```
3. Installera dependencies med 
```
cd Client
npm install
```

# Starta projektet, (också från Client/
`npx expo start --clear`



# Kravlista
 - [x] En logga, splashscreen och appikon ska designas och användas. *
 - [x] Applikationen ska byggas med RN, Expo & TS. *
 - [x] Designen av appen ska utgå ifrån befintliga skisser, undantag kan ges men ska diskuteras med produktägare, godkännas och dokumenteras. *
 - [x] Information ska kommuniceras till och från en server. (VG)

## Hushåll
 - [x] Ett hushåll ska ha ett namn och en genererad (enkel) kod så andra kan gå med i hushållet, namnet ska gå att ändra. *
 - [x] Alla användare i ett hushåll ska kunna se vilka som tillhör ett hushåll.
 - [x] En ägare av ett hushåll ska kunna se förfrågningar om att gå med i hushållet.
 - [x] En ägare ska kunna acceptera eller neka förfrågningar.
 - [x] En ägare ska kunna göra andra till ägare.
 - [x] En ägare ska kunna pausa en användare och under pausade perioder ska användare inte tas med i statistiken.
 - [ ] Om en använder har pausats under en del av en period i statistiken ska graferna normaliseras.

## Konto
 - [x] En användare ska kunna registrera och logga in sig. *
 - [x] En användare ska kunna skapa ett nytt hushåll. *
 - [x] En användare ska kunna gå med i ett hushåll genom att ange hushållets kod. *
 - [x] #177
 - [x] En användare ska kunna lämna ett hushåll.

## Profil
 - [x] En användare ska kunna ange sitt namn. *
 - [x] En användare ska kunna välja en avatar (emoji-djur + färg) från en fördefinierad lista. *
 - [x] Valda avatarer ska inte kunna väljas av andra användare i hushållet. *
 - [x] Avataren ska användas i appen för att visa vad användaren har gjort. *
 - [x] #152
 - [x] Om en användare tillhör två eller fler hushåll ska denne kunna välja att byta mellan de olika hushållen.

## Sysslor
 - [x] En ägare ska kunna lägga till sysslor att göra i hemmet. *
 - [x] En syssla ska ha ett namn, en beskrivning (text), hur ofta den ska göras (dagar), och en  vikt som beskriver hur energikrävande den är. *
 - [x] #134
 - [x] En ägare ska kunna redigera en syssla. *
 - [x] En ägare ska kunna ta bort en syssla.
 - [x] När en syssla tas bort ska användaren få en varning om att all statistik gällande sysslan också kommer att tas bort och få valet att arkivera sysslan istället.

## Dagsvyn
 - [x] Alla sysslor ska listas i en dagsvy och ge en översikt kring vad som behöver göras. *
 - [x] #138
 - [x] När en användare väljer en syssla ska beskrivningen av sysslan visas och det ska även med ett enkelt tryck gå att markera sysslan som gjord. *

## Statistik
 - [x] En användare ska kunna se fördelningen av gjorda sysslor mellan användarna i sitt hushåll. *
 - [x] Varje statistikvy ska visa den totala fördelningen (inräknat vikterna för sysslorna) samt fördelning av varje enskild syssla. *
 - [x] Det ska finnas en statistikvy över ”nuvarande vecka”. *
 - [x] Det ska finnas en statistikvy över ”förra vecka”.
 - [x] Det ska finnas en statistikvy över ”förra månaden”.
 - [x] #185

## Schemaläggning
 - [ ] #172
 - [ ] #173
 - [ ] #203
