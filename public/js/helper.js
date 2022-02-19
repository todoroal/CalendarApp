

export function dateString(date) {
    return `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
}

// Zuordnung eines Index für jeden Tag 0-6 (Mo-So)
// da ursprünglich der Sonntag mit Index 0 gespeichert wird, muss -1 hinzugefügt werden.

export function getDayIndex(date) {
    const falseIndex = date.getDay();
    return falseIndex == 0 ? 6 : falseIndex - 1;
}

// Anzeige der Millisekunden am Tag

const dayInMillis = 1000 * 60 * 60 * 24;

// Funktion mit welcher zu einem bestimmten Tag mehrere Tage addiert werden

export function addDays(date, number) {
    return new Date(date.getTime() + number * dayInMillis);
}

export function generateId(length = 20) {
    const chars = "ABCDEFGHIHJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let id = "";
    for (let i = 0; i < length; i++) {
        const rand = Math.floor(Math.random() * chars.length);
        id += chars.charAt(rand);
    }
    return id;
}
