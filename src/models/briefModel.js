import mongoose from "mongoose";

const BriefSchema = new mongoose.Schema({
	hersteller: { type: String, required: true },
	herstellerSchluessel: { type: String },
	modell: { type: String, required: true },
	modellSchluessel: { type: String },
	baujahr: { type: Number, required: true },
	fahrzeugIdentNummer: { type: String, required: true, unique: true },
	motorIdentNummer: { type: String },
	hubraum: { type: Number },
	leistung: { type: Number },
	anzahlSitze: { type: Number },
	anzahlTueren: { type: Number },
	kraftstoff: { type: String },
	getriebe: { type: String },
	farbe: { type: String },
	leergewicht: { type: Number },
	Gesamtgewicht: { type: Number },
	zulLast: { type: Number, default: 0 },
	zulLast: { type: Number, default: 0 },
	reifen: {
		vorderachse: { type: String },
		hinterachse: { type: String },
	},
	schadstoffklasse: { type: String },

	erstzulassung: { type: Date, required: true },
	zulassungsbezirk: { type: String },
	kennzeichen: { type: String },
	eigentuemer: {
		name: { type: String },
		vorname: { type: String },
		adresse: { type: String },
	},

	besonderheiten: { type: String },
	gueltigkeit: { type: Date },
	aenderungen: {
		type: Array,
		of: {
			datum: { type: Date },
			beschreibung: { type: String },
		},
	},

	bild: { type: String },
});

export const Brief = new mongoose.model("Briefe", BriefSchema);
