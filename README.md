# djd-im2

Unsere Webseite dient dazu den derzeitigen UV-Index sowie auch die zukünftigen Kennzahlen einzusehen. Da aber einfach nur Zahlen langweilig wären, kamen wir auf die Idee jeweils zur Zahl eine passende Sonne zu zeigen. Diese zeichneten wir selbst digital auf dem iPad und liessen uns dabei von den Apple Emojis inspirieren. Damit auch die Schrift zu den gezeichneten Illustrationen passt, wählten wir eine Schrift die wie von Hand geschrieben wirkt. Ausserdem war uns wichtig, dass man gleich den UV-Index von mehreren Schweizer Städten ansehen kann. Wir sind zufrieden mit unserer Webseite mit der süssen Sonne auch wenn der Weg dahin nicht immer einfach war.

Das Figma Design hatten wir ziemlich schnell und auch dank des Coachings konnten wir gut unsere Seite mit der API verbinden und auch das Design anpassen. Hauptproblem war dann aber die Bildgrösse der Sonnen-Illustration, die sich im CSS nicht ändern liess. Nach mehreren Fehlversuchen half uns ChatGPT, den ,Code richtig mit dem Figma-Design zu verbinden. Danach passten wir Bilder, Schriften, Abstände und Platzierungen manuell an. Google sowie ChatGPT halfen bei Detailfragen sowie der richtigen Anpassung der Desktop- zur Mobileversion, die ebenfalls nicht ganz einfach war.

Prompts, die wir für ChatGPT verwendet haben:
- Wir möchten das das main_image auf der linken Seite und responsive ist, je nach Bildschirmgrösse
- Die Symbole 1-5 und die komplette Schrift soll auf der rechten Seite sein. Schreibe meinen Code nun bitte sauber nochmals ab. Kombiniere mir diesen neuen Code bitte mit dem Teil im Alten, der die API verknüpft hat und die Zahlen anzeigt
- Momentan zeigt es folgenden Text an: 2025-05-26T17:00:00Z ich möchte, dass es aber nur 17:00 Uhr anzeigt - (Dies haben wir in weiteren Schritten angepasst auf «17 Uhr»)
- Bei meiner Ansicht füllt das linke Bild (main_image) nicht den kompletten linken Bildschirm, bei meiner Kollegin aber schon. Wieso?
- Wie kann ich machen, dass die Dots an dem main image festkleben und sich nicht bewegen, wenn der Bildschirm angepasst wird? Achtung die Dots sind ein Bild bei mir bitte ohne etwas kaputt zu machen
