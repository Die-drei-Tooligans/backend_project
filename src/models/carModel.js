import mongoose from "mongoose";

const importantVRDSchema = new mongoose.Schema({

});

const VRDSchema = new mongoose.Schema({
	registrationNumber: {type:String, required:true},		// Nummer des Fahrzeugscheins
	licensePlate: {type:String, required:true}, 			// Kennzeichen
	lastNameOrCompany: {type:String, required:true}, 		// Nachname oder Firma
	firstName: {type:String, required:true},				// Vorname
	adress: {type:String, required:true},					// Adresse
	nextHU: {type:Date, required:true},						//! Nächste Hauptuntersuchung
	dateOfRegistration: {type:Date},						// Datum der Zulassung
	townOfRegistration: {type:String},						// Ort der Zulassung
	dateOfFirstRegistration: {type:Date, required:true},	//! Datum der Erstzulassung
	manufacturerNumber: {type:String, required:true},		//! Herstellernummer
	typeNumber: {type:String, required:true},				//! Typnummer
	vehicleClass: {type:String, required:true},				//! Fahrzeugklasse
	constructionType: {type:String},						// Bauart
	FIN: {type:String, required:true},						//! Fahrzeugidentifikationsnummer (FIN)
	checkDigit: {type:Number, required:true},				//! Prüfziffer
	make: {type:String, required:true},						//! Marke
	type: {type:String, required:true},						//! Typ
	variant: {type:String, required:true},					//! Variante
	version: {type:String, required:true},					//! Version
	tradeName: {type:String},								// Handelsname
	manufacturerShortName: {type:String},					// Hersteller-Kurzname
	designationVehicleClass: {type:String,},				// Bezeichnung Fahrzeugklasse
	emissionClassEG: {type:String},							// Emissionsklasse EG
	emissionClass: {type:String, required:true},			//! Emissionsklasse national
	fuelType: {type:String, required:true},					//! Kraftstoffart
	fuelCode: {type:Number},								// Kraftstoffcode
	emissionCode: {type:Number},							// Emissionscode
	cubicCapacity: {type:Number, required:true},			//! Hubraum
	numberOfAxes: {type:Number},							// Anzahl der Achsen
	numberOfDriveAxles: {type:Number},						// Anzahl der angetriebenen Achsen
	ratedPowerAndSpeed: {type:String},						// Nennleistung in kW und Nenndrehzahl bei min-1
	maxSpeed: {type:Number},								// Höchstgeschwindigkeit
	length: {type:Number},									// Länge
	width: {type:Number},									// Breite
	height: {type:Number},									// Höhe
	emptyMass: {type:Number},								// Leergewicht
	capacityTankVehicles: {type:Number},					// Fassungsvermögen Tank bei TANKfahrzeugen
	supportLoad: {type:Number},								// Stützlast in kg
	PowerToWeightRatio: {type:Number},						// Leistungsgewicht in kw/kg nur KRAFTFAHRRÄDER
	co2Emission: {type:Number},								// CO2 (in g/km)
	maxMass: {type:Number},									// Technisch zulässige Gesamtmasse in kg
	maxMassMemberState: {type:Number},						// Zulässige Gesamtmasse im Mitgliedsstaat in kg
	permittedAxleLoad1: {type:Number},						//  Technisch zugelassene Achslast/Masse je Achsgruppe (in kg für Achse 1)
	permittedAxleLoad2: {type:Number},						//  Technisch zugelassene Achslast/Masse je Achsgruppe (in kg für Achse 2)
	permittedAxleLoad3: {type:Number},						//  Technisch zugelassene Achslast/Masse je Achsgruppe (in kg für Achse 3)
	permittedAxleLoad1MemberState: {type:Number},			//  Zulässige Achslast im Mitgliedsstaat (in kg für Achse 1)
	permittedAxleLoad2MemberState: {type:Number},			//  Zulässige Achslast im Mitgliedsstaat (in kg für Achse 2)
	permittedAxleLoad3MemberState: {type:Number},			//  Zulässige Achslast im Mitgliedsstaat (in kg für Achse 3)
	idleNoise: {type:Number},								// Standgeräusch in dB
	speedinMin1: {type:Number},								// Drehzahl in min-1 zu U.1
	drivingNoise: {type:Number},							// Fahrgeräusch in dB
	trailerLoadBraked: {type:Number},						// Anhängelast gebremst in kg
	trailerLoadUnbraked: {type:Number},						// Anhängelast ungebremst in kg
	totalSeats: {type:Number},								// Gesamtzahl der Sitzplätze einschließlich Fahrersitz
	numberOfStandingPlaces: {type:Number},					// Anzahl der Stehplätze BUS
	tiresAxle1: {type:String},								// Bereifung Achse 1
	tiresAxle2: {type:String},								// Bereifung Achse 2
	tiresAxle3: {type:String},								// Bereifung Achse 3
	vehicleColor: {type:String, required:true},				//! Fahrzeugfarbe
	vehicleColorCode: {type:String, required:true},			//! Fahrzeugfarbcode
	permitNumber: {type:String},							// Nummer der EG-Typgenehmigung oder der Allgemeinen Betriebserlaubnis
	permitDate: {type:Date},								// Datum der EG-Typgenehmigung oder der Allgemeinen Betriebserlaubnis
	attributePermit: {type:String},							// Merkmal zur EG-Typgenehmigung oder zur Allgemeinen Betriebserlaubnis
	numberOfCertificate2: {type:String},					// Nummer der Zulassungsbescheinigung Teil 2
	otherNotes: {type:String},								// Sonstige Bemerkungen
	remarksAndExceptions: {type:String, required:true},		//! Hinweise und Ausnahmen
});

const extraCarDataSchema = new mongoose.Schema({

});


const carSchema = new mongoose.Schema({
	importantVRD: {type:importantVRDSchema},
	VRD: {type:VRDSchema},
	extraCarData: {type:extraCarDataSchema},
});

export const carModel = mongoose.models.car || mongoose.model("car", carSchema);