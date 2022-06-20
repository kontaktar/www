export const users = [
  {
    // id: 1
    ssn: "1110752559",
    firstName: "Hannes",
    lastName: "Kristjánsson",
    userName: "hannes",
    userAddress: {
      create: {
        city: "Reykjavík",
        streetName: "Suðurlandsbraut 133",
        postalCode: "108",
        country: "Iceland"
      }
    },
    userStatistics: {
      create: {
        updatedAt: new Date()
      }
    },
    userMetaData: {
      create: {
        email: "hannes@kontaktar.is",
        website: "hannes.com"
      }
    },
    userPhoneNumber: {
      create: {
        phoneCountryExtension: "+354",
        phoneNumber: "8881111"
      }
    },
    Experiences: {
      create: [
        {
          title: "Hanna verslunarrými frá A til Ö",
          description:
            "Arkitekt frá Mílanó. Hannaði allar verslanir BRIMKOPA og verslanir PPKT. Starfaði með arkitektastofunni Hlýr í Reykjavík í 4 ár og eftir það sjálfstætt. Hef komið að hönnun 30 verslana.",
          years: 10,
          months: 10,
          published: false
        },
        {
          title:
            "Hönnun verslunarrýmis með verkteikningum, lýsingu og innréttingum",
          description:
            "Arkitekt frá Mílanó. Hannaði skrifstofubyggingu ALMOS. Starfaði hjá arkitektastofu í Mílanó í 6 ár sem sérhæfði sig í skrifstofuhúsnæði.",
          years: 6,
          months: 10,
          published: true
        },
        {
          title: "Námskeið í hönnun verslunarrýmis.",
          description:
            "Farið í grunnatriði hönnunar verslunar. Aðgegni viðskiptavina. Áskoranir í framsetningu vöru, birgðageymslu og starfsmannaaðstöðu.",
          years: 6,
          months: 10,
          published: true
        },
        {
          title: "Hljóðvist í vinnurými.",
          description:
            "Þar sem skrifstofurými eru opin var mikil áhersla lögð á vandaða hljóðvist vinnurýma. Þannig var kappkostað að lágmarka hljóð frá tæknibúnaði innanhúss og að hljóðeinangrun milli rýma væri góð.",
          years: 6,
          months: 10,
          published: false
        }
      ]
    }
  },
  {
    // id: 2
    ssn: "1212762529",
    firstName: "Kári Karl",
    lastName: "Friðriksson Reykdal",
    userName: "kari",
    userAddress: {
      create: {
        city: "Reykjavík",
        streetName: "Fagrahlíð",
        postalCode: "105",
        country: "Iceland"
      }
    },
    userStatistics: {
      create: {
        updatedAt: new Date()
      }
    },
    userMetaData: {
      create: {
        email: "karikarl@gmail.com",
        website: ""
      }
    },
    userPhoneNumber: {
      create: {
        phoneCountryExtension: "+354",
        phoneNumber: "8881020"
      }
    },
    Experiences: {
      create: [
        {
          title: "Kostnaðaráætlanir, hönnun og ráðgjöf við mannvirkjagerð.",
          description:
            "Stýring verkefna, gerð og eftirfylgni tíma- og kostnaðaráætlana ásamt framkvæmdaeftirliti.",
          years: 12,
          months: 0,
          published: false
        },
        {
          title: "Gerð útboðsgagna og samninga í mannvirkjagerð",
          description:
            "Stýring verkefna, gerð og eftirfylgni tíma- og kostnaðaráætlana ásamt framkvæmdaeftirliti.",
          years: 0,
          months: 12,
          published: true
        },
        {
          title: "Umsjón og eftirlit framkvæmda í mannvirkjagerð",
          description:
            "Stýring verkefna, gerð og eftirfylgni tíma- og kostnaðaráætlana ásamt framkvæmdaeftirliti.",
          years: 2,
          months: 10,
          published: true
        },
        {
          title: "Burðarþols- og lagnahönnun í þrívídd.",
          description:
            "Sérþekking á sviðum burðarþolshönnunar með nýjustu þróun í hönnunaraðferðum, hugbúnaðartækni og þríviddarvinnslu til þess að uppfylla þarfir viðskiptavinarins, hvort sem um er að ræða ný eða eldri mannvirki. Af þekktum mannvirkjum í burðarþolshönnun má nefna Grand Hótel og Háskólatorg.",
          years: 6,
          months: 10,
          published: true
        },
        {
          title: "Greining aksturferla og umferðarflæðis um lóðir fyrirtækja",
          description:
            "Dæmi um verkefni á þessu sviði má nefna greiningu akstursferla og umferðarflæðis á nýrri lóð Kommunen í Haag og hönnunarstýringu þjónustumiðstöðvar við Gullsmára í Kópavogi.",
          years: 1,
          months: 10,
          published: true
        }
      ]
    }
  },
  {
    // id: 3
    ssn: "1301772249",
    firstName: "Arnmundur Auðunn",
    lastName: "Arnmundusson",
    userName: "arnmundur",
    userAddress: {
      create: {
        city: "Kópavogur",
        streetName: "Hamraborg 22",
        postalCode: "200",
        country: "Iceland"
      }
    },
    userStatistics: {
      create: {
        updatedAt: new Date()
      }
    },
    userMetaData: {
      create: {
        email: "arnmundur@arnmundur.is",
        website: "arnmundur.is"
      }
    },
    userPhoneNumber: {
      create: {
        phoneCountryExtension: "+354",
        phoneNumber: "8881030"
      }
    },
    Experiences: {
      create: [
        {
          title: "Umbrot og textavinna.",
          description:
            "Starfaði í umbroti og textavinnu hjá Héraðsblaðinu.  Menntaður vefhönnuður frá Tækniskólanum. Vinn með Indesign, Illustrator og Photoshop.",
          years: 12,
          months: 0,
          published: false
        },
        {
          title: "Vefhönnun og lógó.",
          description:
            "Menntaður vefhönnuður frá Tækniskólanum. Vinn með Indesign, Illustrator og Photoshop. Hanna vefi  að hluta og í heild sinni, lógó og merkingar. Hef mikið starfað við vefumsjón, mest með vefumsjónarkerfin WordPress og WooCommerce.   Dæmi um hönnun og vefsíðugerð er að finna á vefnum minum arnmundur.is",
          years: 0,
          months: 12,
          published: true
        },
        {
          title: "Vefumsjón",
          description:
            "Menntaður vefhönnuður frá Tækniskólanum. Vinn með Indesign, Illustrator og Photoshop. Hanna vefi  að hluta og í heild sinni, lógó og merkingar. Hef mikið starfað við vefumsjón, mest með vefumsjónarkerfin WordPress og WooCommerce.   Dæmi um hönnun og vefsíðugerð er að finna á vefnum minum arnmundur.is",
          years: 0,
          months: 12,
          published: true
        }
      ]
    }
  },
  {
    // id: 4
    ssn: "1402803229",
    firstName: "Guðrún Hrefna",
    lastName: "Hallgrímsdóttir",
    userName: "gugga",
    userAddress: {
      create: {
        city: "Berlin",
        streetName: "Berlinstrasse 142",
        postalCode: "",
        country: "Germany"
      }
    },
    userStatistics: {
      create: {
        updatedAt: new Date()
      }
    },
    userMetaData: {
      create: {
        email: "gudrun.hrefna@ghhall.com",
        website: "ghhall.com"
      }
    },
    userPhoneNumber: {
      create: {
        phoneCountryExtension: "+354",
        phoneNumber: "8881040"
      }
    },
    Experiences: {
      create: [
        {
          title: "Tek að mér að skrifa fréttir og blogg á vefsíður fyrirtækja",
          description:
            "Hef lengst af unnið við textagerð og fréttaskrif. Tekið og skrifað fjölda viðtala. Er menntaður íslenskufræðingur og hef prófarkalesið skýrslur, bæklinga, vefsíður, bækur, blogg og fjölmiðla.",
          years: 4,
          months: 4,
          published: false
        },
        {
          title: "Tek að mér prófarkalestur á skýrslum og markaðsefni",
          description:
            "Hef lengst af unnið við textagerð og fréttaskrif. Tekið og skrifað fjölda viðtala. Er menntaður íslenskufræðingur og hef prófarkalesið skýrslur, bæklinga, vefsíður, bækur, blogg og fjölmiðla.",
          years: 0,
          months: 12,
          published: true
        },
        {
          title:
            "Tek að mér textaskrif fyrir fyrirtæki, ársskýrslur og bæklinga.",
          description:
            "Hef lengst af unnið við textagerð og fréttaskrif. Tekið og skrifað fjölda viðtala. Er menntaður íslenskufræðingur og hef prófarkalesið skýrslur, bæklinga, vefsíður, bækur, blogg og fjölmiðla.",
          years: 0,
          months: 12,
          published: true
        }
      ]
    }
  },
  {
    // id: 5
    ssn: "1503814239",
    firstName: "Hafdís Þórgunnur",
    lastName: "Þórarinsdóttir Beck",
    userName: "thbeck",
    userAddress: {
      create: {
        city: "London",
        streetName: "",
        postalCode: "",
        country: "United Kingdom"
      }
    },
    userStatistics: {
      create: {
        updatedAt: new Date()
      }
    },
    userMetaData: {
      create: {
        email: "hth@thbeck.com",
        website: "thbeck.com"
      }
    },
    userPhoneNumber: {
      create: {
        phoneCountryExtension: "+354",
        phoneNumber: "8881050"
      }
    },
    Experiences: {
      create: [
        {
          title: "Aðstoð við arðsemisútreikninga verkefna og fyrirtækja",
          description:
            "Hef veitt fyrirtækjum fjármálaráðgjöf, bæði sem starfsmaður Arion banka og Íslandsbanka í 4 ár og síðar sem óháður ráðgjafi. Menntun í fjármálum frá UPenn með áherslu á áhættustýringu og fjármögnun. Kenni áhættustýringu í Háskóla Íslands og hef haldið fjölda námskeiða um fjármál.",
          years: 2,
          months: 0,
          published: true
        },
        {
          title: "Námskeið um fjármál fyrirtækja og áhættustýringu",
          description:
            "Hef veitt fyrirtækjum fjármálaráðgjöf, bæði sem starfsmaður Arion banka og Íslandsbanka í 4 ár og síðar sem óháður ráðgjafi. Menntun í fjármálum frá UPenn með áherslu á áhættustýringu og fjármögnun. Kenni áhættustýringu í Háskóla Íslands og hef haldið fjölda námskeiða um fjármál.",
          years: 2,
          months: 0,
          published: true
        },
        {
          title: "Ráðgjöf til fyrirtækja um lausafjárstýringu",
          description:
            "Hef veitt fyrirtækjum fjármálaráðgjöf, bæði sem starfsmaður Arion banka og Íslandsbanka í 4 ár og síðar sem óháður ráðgjafi. Menntun í fjármálum frá UPenn með áherslu á áhættustýringu og fjármögnun. Kenni áhættustýringu í Háskóla Íslands og hef haldið fjölda námskeiða um fjármál.",
          years: 2,
          months: 0,
          published: true
        },
        {
          title: "Verðmat á núverandi eignum",
          description:
            "Hef veitt fyrirtækjum fjármálaráðgjöf, bæði sem starfsmaður Arion banka og Íslandsbanka í 4 ár og síðar sem óháður ráðgjafi. Menntun í fjármálum frá UPenn með áherslu á áhættustýringu og fjármögnun. Kenni áhættustýringu í Háskóla Íslands og hef haldið fjölda námskeiða um fjármál.",
          years: 2,
          months: 0,
          published: true
        },
        {
          title: "Mótun fjárfestingastefnu",
          description:
            "Hef veitt fyrirtækjum fjármálaráðgjöf, bæði sem starfsmaður Arion banka og Íslandsbanka í 4 ár og síðar sem óháður ráðgjafi. Menntun í fjármálum frá UPenn með áherslu á áhættustýringu og fjármögnun. Kenni áhættustýringu í Háskóla Íslands og hef haldið fjölda námskeiða um fjármál.",
          years: 2,
          months: 0,
          published: true
        },
        {
          title: "Ráðgjöf um samruna og yfirtökur",
          description:
            "Hef veitt fyrirtækjum fjármálaráðgjöf, bæði sem starfsmaður Arion banka og Íslandsbanka í 4 ár og síðar sem óháður ráðgjafi. Menntun í fjármálum frá UPenn með áherslu á áhættustýringu og fjármögnun. Kenni áhættustýringu í Háskóla Íslands og hef haldið fjölda námskeiða um fjármál.",
          years: 2,
          months: 0,
          published: true
        },
        {
          title: "Aðstoð við fjármögnun verkefna",
          description:
            "Hef veitt fyrirtækjum fjármálaráðgjöf, bæði sem starfsmaður Arion banka og Íslandsbanka í 4 ár og síðar sem óháður ráðgjafi. Menntun í fjármálum frá UPenn með áherslu á áhættustýringu og fjármögnun. Kenni áhættustýringu í Háskóla Íslands og hef haldið fjölda námskeiða um fjármál.",
          years: 7,
          months: 4,
          published: true
        },
        {
          title: "Námskeið um fjármögnun og arðsemisútreikninga verkefna",
          description:
            "Hef veitt fyrirtækjum fjármálaráðgjöf, bæði sem starfsmaður Arion banka og Íslandsbanka í 4 ár og síðar sem óháður ráðgjafi. Menntun í fjármálum frá UPenn með áherslu á áhættustýringu og fjármögnun. Kenni áhættustýringu í Háskóla Íslands og hef haldið fjölda námskeiða um fjármál.",
          years: 2,
          months: 0,
          published: true
        },
        {
          title: "Aðstoð við kaup og sölu fyrirtækja",
          description:
            "Hef veitt fyrirtækjum fjármálaráðgjöf, bæði sem starfsmaður Arion banka og Íslandsbanka í 4 ár og síðar sem óháður ráðgjafi. Menntun í fjármálum frá UPenn með áherslu á áhættustýringu og fjármögnun. Kenni áhættustýringu í Háskóla Íslands og hef haldið fjölda námskeiða um fjármál.",
          years: 3,
          months: 1,
          published: true
        },
        {
          title: "Ráðgjöf til fyrirtækja um fjárhagslega endurskipulagningu",
          description:
            "Hef veitt fyrirtækjum fjármálaráðgjöf, bæði sem starfsmaður Arion banka og Íslandsbanka í 4 ár og síðar sem óháður ráðgjafi. Menntun í fjármálum frá UPenn með áherslu á áhættustýringu og fjármögnun. Kenni áhættustýringu í Háskóla Íslands og hef haldið fjölda námskeiða um fjármál.",
          years: 2,
          months: 3,
          published: true
        },
        {
          title:
            "Ráðgjöf við högun fjárfestinga og áhættustýringu, mat á fjárfestingakostum",
          description:
            "Hef veitt fyrirtækjum fjármálaráðgjöf, bæði sem starfsmaður Arion banka og Íslandsbanka í 4 ár og síðar sem óháður ráðgjafi. Menntun í fjármálum frá UPenn með áherslu á áhættustýringu og fjármögnun. Kenni áhættustýringu í Háskóla Íslands og hef haldið fjölda námskeiða um fjármál.",
          years: 2,
          months: 0,
          published: true
        }
      ]
    }
  },
  {
    // id: 6
    ssn: "1604854449",
    firstName: "Sigríður",
    lastName: "Svansdóttir",
    userName: "svanirnir",
    userAddress: {
      create: {
        city: "Vestmannaeyjar",
        streetName: "",
        postalCode: "900",
        country: "Iceland"
      }
    },
    userStatistics: {
      create: {
        updatedAt: new Date()
      }
    },
    userMetaData: {
      create: {
        email: "ksirry@svanirnir.is",
        website: "svanirnir.is"
      }
    },
    userPhoneNumber: {
      create: {
        phoneCountryExtension: "+354",
        phoneNumber: "8881060"
      }
    },
    Experiences: {
      create: [
        {
          title: "Skattalegar og lögfræðilegar áreiðanleikakannanir",
          description:
            "Áreiðanleikakannanir sem lúta m.a. að staðfestingu á lagalegri stöðu, í aðdraganda eða vegna samningsgerðar, sem oft á tíðum tengjast fjármögnun verkefna og/eða viðskiptum við erlenda aðila.",
          years: 2,
          months: 0,
          published: true
        },
        {
          title: "Verjendur í skattamálum",
          description:
            "Sérfræðingar með áratugareynslu af skattkerfinu, m.a. við skatteftirlit og skattrannsóknir. Sérþekking á verjendastörfum skattsvikamála sem og aðstoð við aðra lögmenn eða sérfræðinga við þeirra störf.",
          years: 2,
          months: 0,
          published: true
        },
        {
          title: "Lögfræðileg ráðgjöf við samruna og yfirtökur",
          description:
            "Lögfræðiráðgjöf, samningaviðræður og samningsgerð við yfirtökur og samruna fyrirtækja á Íslandi eða erlendis. Meðal viðskiptavina eru Apple, Walmart og Bykopp.",
          years: 2,
          months: 0,
          published: true
        }
      ]
    }
  },
  {
    // id: 7
    ssn: "1705665659",
    firstName: "Þormóður Orri",
    lastName: "Albertsson",
    userName: "thorri",
    userAddress: {
      create: {
        city: "Reykjavík",
        streetName: "Suðurlandsbraut 22",
        postalCode: "108",
        country: "Iceland"
      }
    },
    userStatistics: {
      create: {
        updatedAt: new Date()
      }
    },
    userMetaData: {
      create: {
        email: "thorri@kontaktar.is",
        website: ""
      }
    },
    userPhoneNumber: {
      create: {
        phoneCountryExtension: "+354",
        phoneNumber: "8881070"
      }
    },
    Experiences: {
      create: [
        {
          title: "Smíði á vefsíðum frá grunni eða ofan á WP",
          description:
            "Reyndur hugbúnaðarsérfræðingur, þekki best HTML, CSS, SQL, .NET, MVC, PHP, Javascript, Python, C++, Photoshop, Illustrator, Windows, Linux & Wordpress. Meðal viðskiptavina eru Auglýsingastofan, Ferðastkrifstofan og Búðin",
          years: 2,
          months: 0,
          published: true
        }
      ]
    }
  },
  {
    // id: 8
    ssn: "1806546649",
    firstName: "Ýr",
    lastName: "Önnudóttir",
    userName: "yrr",
    userAddress: {
      create: {
        city: "Akureyri",
        streetName: "",
        postalCode: "600",
        country: "Iceland"
      }
    },
    userStatistics: {
      create: {
        updatedAt: new Date()
      }
    },
    userMetaData: {
      create: {
        email: "yronnu@gmail.com",
        website: ""
      }
    },
    userPhoneNumber: {
      create: {
        phoneCountryExtension: "+354",
        phoneNumber: "8881080"
      }
    },
    Experiences: {
      create: [
        {
          title: "Hanna og forrita vefsíður, öpp og ýmis forrit",
          description:
            "Úskrifaður tölvunarfræðingur frá HR 2020. Hef nokkuð góða kunnáttu í forritunarmálum eins og Java, C++, HTML/CSS, JSP og JavaScript.",
          years: 2,
          months: 2,
          published: true
        }
      ]
    }
  },
  {
    // id: 9
    ssn: "1907900269",
    firstName: "Árni Tryggvi",
    lastName: "Tryggvason",
    userName: "trytry",
    userAddress: {
      create: {
        city: "Reykjavík",
        streetName: "Bárugötu 1",
        postalCode: "101",
        country: "Iceland"
      }
    },
    userStatistics: {
      create: {
        updatedAt: new Date()
      }
    },
    userMetaData: {
      create: {
        email: "arni@trytry.is",
        website: "trytry.is"
      }
    },
    userPhoneNumber: {
      create: {
        phoneCountryExtension: "+354",
        phoneNumber: "8881090"
      }
    },
    Experiences: {
      create: [
        {
          title:
            "Vinnustofur fyrir starfsmenn fyrirtækja í notkun verkfæra Lean & Six Sigma",
          description:
            "Starfaði á sviði Lean, stöðugra umbóa og gæðamála, á Norðurlöndum,  verkferlagreining í þjónustu, framleiðslu, aðfangakeðjum og skrifstofuumhverfi, Hef haldið vinnustofur hjá fyrirtækjum á Íslandi og í Noregi í eitt ár.",
          years: 2,
          months: 2,
          published: true
        }
      ]
    }
  },
  {
    // id: 10
    ssn: "2008881109",
    firstName: "Högurður Ljósvíkingur",
    lastName: "Torfason",
    userName: "hogurdur",
    userAddress: {
      create: {
        city: "",
        streetName: "",
        postalCode: "0",
        country: "Útlönd"
      }
    },
    userStatistics: {
      create: {
        updatedAt: new Date()
      }
    },
    userMetaData: {
      create: {
        email: "ljos@hogurdur.is",
        website: "hogurdur.is "
      }
    },
    userPhoneNumber: {
      create: {
        phoneCountryExtension: "+354",
        phoneNumber: "8881100"
      }
    },
    Experiences: {
      create: [
        {
          title: "Námskeið - Jákvæð samskipti á vinnustað",
          description:
            "Námskeið sem eflir starfsfólk í jákvæðum samskiptum, byggð á gagnkvæmri virðingu og sjálfsstjórn. Hefur verið haldið hjá 12 fyrirtækjum með góðum árangri. Námskeiðið er 1 klst og hentar því vel á morgunfundi eða í hádegishléi.",
          years: 2,
          months: 2,
          published: true
        }
      ]
    }
  },
  {
    // id: 11
    ssn: "2109003230",
    firstName: "Ragnar Ketill",
    lastName: "Frímannsson",
    userName: "raggi",
    userAddress: {
      create: {
        city: "Hafnarfjörður",
        streetName: "",
        postalCode: "220",
        country: "Útlönd"
      }
    },
    userStatistics: {
      create: {
        updatedAt: new Date()
      }
    },
    userMetaData: {
      create: {
        email: "ragnarketill@gmail.com",
        website: ""
      }
    },
    userPhoneNumber: {
      create: {
        phoneCountryExtension: "+354",
        phoneNumber: "8881110"
      }
    },
    Experiences: {
      create: [
        {
          title: "Námskeið - Árangursrík og öflug liðsheild á vinnustað",
          description:
            "Kennari í meistaranámi HR og margreyndur stjórnandi. Markmið námskeiðsins er að stjórnandinn fái í hendur verkfæri og kynnist aðferðum til þess að ná enn meiri árangri sem stjórnandi öflugrar liðsheildar. Sérstök áhersla er lögð á að stjórandinn öðlist færni til að styðja við jákvæða framþróun teymisins síns. Námskeiðið er 7 klst.",
          years: 4,
          months: 4,
          published: true
        }
      ]
    }
  },
  {
    // id: 12
    ssn: "1009893339",
    firstName: "Halldóra Vera",
    lastName: "Agnarsdóttir",
    userName: "hverannar",
    userAddress: {
      create: {
        city: "Hafnarfjörður",
        streetName: "",
        postalCode: "220",
        country: "Útlönd"
      }
    },
    userStatistics: {
      create: {
        updatedAt: new Date()
      }
    },
    userMetaData: {
      create: {
        email: "hverannar@firstclass.is",
        website: "hverannaren.is"
      }
    },
    userPhoneNumber: {
      create: {
        phoneCountryExtension: "+354",
        phoneNumber: "5555050"
      }
    },
    Experiences: {
      create: [
        {
          title: "Hönnun bæklinga og vörulista",
          description:
            "Hef hannað vörulista og prentað kynningarefni fyrir þrjú af stærstu fyrirtækjum landsins. Marel hefur verið fastur viðskiptavinur í þrjú ár.  (Textinn er sýnishorn.  Um tilraun að ræða)",
          years: 6,
          months: 4,
          published: true
        }
      ]
    }
  },
  {
    // id: 13
    ssn: "1010621129",
    firstName: "Karólína",
    lastName: "Einarsdóttir",
    userName: "karolinaeinars",
    userAddress: {
      create: {
        city: "Hafnarfjörður",
        streetName: "",
        postalCode: "220",
        country: "Útlönd"
      }
    },
    userStatistics: {
      create: {
        updatedAt: new Date()
      }
    },
    userMetaData: {
      create: {
        email: "karoein@kontaktar.is",
        website: ""
      }
    },
    userPhoneNumber: {
      create: {
        phoneCountryExtension: "+354",
        phoneNumber: "6849283"
      }
    }
  },
  {
    // id: 14
    ssn: "7800000000",
    firstName: "TESTER",
    lastName: "TESTERSON",
    userName: "TESTUSER1",
    userAddress: {
      create: {
        city: "TESTVÍK",
        streetName: "TESTGATA 52",
        postalCode: "550",
        country: "TESTLAND"
      }
    },
    userStatistics: {
      create: {
        updatedAt: new Date()
      }
    },
    userMetaData: {
      create: {
        email: "test@test.is",
        website: "www.test.is"
      }
    },
    userPhoneNumber: {
      create: {
        phoneCountryExtension: "+354",
        phoneNumber: "1111111"
      }
    }
  }
];
