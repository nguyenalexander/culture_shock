var express = require('express');
var router = express.Router();
var db = require('../models');

var languageArr = ["Afrikaans","Akan","Albanian",
"Amharic","Arabic","Armenian",
"Azerbaijani","Basque","Belarusian",
"Bemba","Bengali","Bihari",
"Bosnian","Breton","Bulgarian",
"Cambodian","Catalan","Cherokee",
"Chichewa","Chinese (Simplified)","Chinese (Traditional)",
"Corsican","Croatian","Czech",
"Danish","Dutch","English",
"Esperanto","Estonian","Ewe",
"Faroese","Filipino","Finnish",
"French","Frisian","Ga",
"Galician","Georgian","German",
"Greek","Guarani","Gujarati",
"Haitian Creole","Hausa",
"Hawaiian","Hebrew","Hindi",
"Hungarian","Icelandic","Igbo",
"Indonesian","Interlingua","Irish",
"Italian","Japanese","Javanese",
"Kannada","Kazakh","Kinyarwanda",
"Kirundi","Kongo","Korean",
"Krio (Sierra Leone)","Kurdish","Kurdish (Soranî)",
"Kyrgyz","Laothian",
"Latin","Latvian","Lingala",
"Lithuanian","Lozi","Luganda",
"Luo","Macedonian","Malagasy",
"Malay","Malayalam","Maltese",
"Maori","Marathi","Mauritian Creole",
"Moldavian","Mongolian","Montenegrin",
"Nepali","Nigerian Pidgin","Northern Sotho",
"Norwegian","Norwegian (Nynorsk)","Occitan",
"Oriya","Oromo","Pashto",
"Persian","Polish",
"Portuguese (Brazil)","Portuguese (Portugal)","Punjabi",
"Quechua","Romanian","Romansh",
"Runyakitara","Russian","Scots Gaelic",
"Serbian","Serbo-Croatian","Sesotho",
"Setswana","Seychellois Creole","Shona",
"Sindhi","Sinhalese","Slovak",
"Slovenian","Somali","Spanish",
"Spanish (Latin American)","Sundanese","Swahili",
"Swedish","Tajik","Tamil",
"Tatar","Telugu","Thai",
"Tigrinya","Tonga","Tshiluba",
"Tumbuka","Turkish","Turkmen",
"Twi","Uighur","Ukrainian",
"Urdu","Uzbek","Vietnamese",
"Welsh","Wolof","Xhosa",
"Yiddish","Yoruba","Zulu"];

router.get('/', function(req,res){
  res.render('language/index', {languageArr:languageArr});
})

router.get('/:name', function(req,res){
  res.render('language/language');
})

router.get('/:name/map', function(req,res){
  res.render('language/map');
})

module.exports = router;