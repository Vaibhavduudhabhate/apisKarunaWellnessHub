import mongoose from "mongoose";
import productModel from "./model/productModel.js";
import fs from "fs";
import path from "path";
// path

async function connectMongoDb(url) {
    return mongoose.connect(url);
}

async function addDummyProducts() {
    await connectMongoDb('mongodb+srv://admin:admin1234@cluster0.w3huoar.mongodb.net/practiceDatabase');
    // const assetsPath = \.resolve("assets");
    const assetsPath = path.resolve("assets");

    const dummyProducts = [
        {
            Product_name: "PROWINGS SANITARY NAPKINS  &  Anti-Bacterial with Graphene Anion chip & Fir Technology",
            Product_tagline:"",
            Product_varient: "Large 8 PADS",
            Product_image: `data:image/jpeg;base64,${fs.readFileSync(path.join(assetsPath, "healthforce.png")).toString("base64")}`,
            Product_price: "175 ₹",
            Product_description_english: `
            * REDUCES THE ABDOMINAL CRAMPS DURING MENSTRUATION
            * CAN ABSORB 5 TIMES MORE FLUID THAN TRADITIONAL PADS
            * POSSESSES ANTI-CANCER EFFECTS
            * CONTAINS NO HARMFUL CHEMICALS, TOXINS, BLEACHES, AND PERFUMES
            * THINNEST NANO-MATERIAL THAT CAN BE USED IN SANITARY PRODUCTS
            * ELIMINATES ALLERGIES AND INFECTIONS`,
            Product_description_hindi: `
            * मासिक धर्म के दौरान पेट में ऐंठन को कम करता है
            * पारंपरिक पैड की तुलना में 5 गुना अधिक तरल पदार्थ अवशोषित कर सकता है
            * कैंसर विरोधी प्रभाव रखता है
            * इसमें कोई हानिकारक रसायनिक पदार्थ, टॉक्सिन, ब्लीच और परफ्यूम नहीं है
            * सबसे पतला नैनो-मटेरियल जिसका उपयोग सैनिटरी उत्पादों में किया जा सकता है
            * एलर्जी और संक्रमण को दूर करता है`
        },
        {
            Product_name: "PROWINGS SANITARY NAPKINS  &  Anti-Bacterial with Graphene Anion chip & Fir Technology",
            Product_tagline:"",
            Product_varient: "XXL 7 PADS",
            Product_image: `data:image/jpeg;base64,${fs.readFileSync(path.join(assetsPath, "healthforce.png")).toString("base64")}`,
            Product_price: "175 ₹",
            Product_description_english: `
            * REDUCES THE ABDOMINAL CRAMPS DURING MENSTRUATION
            * CAN ABSORB 5 TIMES MORE FLUID THAN TRADITIONAL PADS
            * POSSESSES ANTI-CANCER EFFECTS
            * CONTAINS NO HARMFUL CHEMICALS, TOXINS, BLEACHES, AND PERFUMES
            * THINNEST NANO-MATERIAL THAT CAN BE USED IN SANITARY PRODUCTS
            * ELIMINATES ALLERGIES AND INFECTIONS`,
            Product_description_hindi: `
            * मासिक धर्म के दौरान पेट में ऐंठन को कम करता है
            * पारंपरिक पैड की तुलना में 5 गुना अधिक तरल पदार्थ अवशोषित कर सकता है
            * कैंसर विरोधी प्रभाव रखता है
            * इसमें कोई हानिकारक रसायनिक पदार्थ, टॉक्सिन, ब्लीच और परफ्यूम नहीं है
            * सबसे पतला नैनो-मटेरियल जिसका उपयोग सैनिटरी उत्पादों में किया जा सकता है
            * एलर्जी और संक्रमण को दूर करता है`
        },
        {
            Product_name: "PROLINER  &  Anti-Bacterial with Graphene Anion chip & Fir Technology",
            Product_varient: "",
            Product_tagline:"",
            Product_image: `data:image/jpeg;base64,${fs.readFileSync(path.join(assetsPath, "healthforce.png")).toString("base64")}`,
            Product_price: "175 ₹",
            Product_description_english: `
            * IT KEEPS YOU DRY AND FRESH ALL DAY. IT PROVIDES EVERYDAY PROTECTION FROM URINE LEAKAGE, VAGINAL DISCHARGE, OR AN UNEXPECTED PERIOD
            * IT IS ALSO HELPFUL FOR THOSE VERY LAST DAYS OF YOUR MENSTRUAL PERIOD, WHEN THE DISCHARGE HAS ESSENTIALLY STOPPED BUT THERE IS STILL SOME SPOTTING THAT IS EITHER BROWN OR PINK
            * MOTHERS OF NEW INFANTS MIGHT USE PANTY LINERS FOR MANAGING LIGHT POSTPARTUM FLOW WHICH THEY EXPERIENCE FOR A FEW WEEKS OR SOMETIMES MONTHS AFTER CHILDBIRTH
            * IT IS HELPFUL IN MANAGING ADULT INCONTINENCE
            * OLDER PEOPLE ARE PRONE TO MILD OR MODERATE LEAKAGE. HOWEVER, A STRONG PRODUCT MAY BE REQUIRED`,
            Product_description_hindi: `
            * यह आपको पूरे दिन सूखा और तरोताजा रखता है
            * यह मूत्र रिसाव, योनि स्राव, या अप्रत्याशित अवधि से प्रतिदिन सुरक्षा प्रदान करता है
            * यह आपके मासिक धर्म के उन आखिरी दिनों के लिए भी मददगार है, जब डिस्चार्ज अनिवार्य रूप से बंद हो जाता है, लेकिन अभी भी कुछ धब्बे हैं जो भूरे या गुलाबी हैं
            * नए शिशुओं की माताएं हल्के प्रसवोत्तर प्रवाह को प्रबंधित करने के लिए पैंटी लाइनर्स का उपयोग कर सकती हैं, जिसे वे बच्चे के जन्म के बाद कुछ हफ्तों या कभी-कभी महीनों तक अनुभव करती हैं
            * यह वयस्क असंयम के प्रबंधन में सहायक है, वृद्ध लोग हल्के या मध्यम रिसाव के शिकार होते हैं, हालांकि, एक मजबूत उत्पाद की आवश्यकता हो सकती है`
        },
        {
            Product_name: "HEALTH FORCE CAPSULES &  Good health is in your hands!!",
            Product_image: `data:image/jpeg;base64,${fs.readFileSync(path.join(assetsPath, "healthforce.png")).toString("base64")}`,
            Product_price: "1200 ₹",
            Product_varient: "",
            Product_tagline:"",
            Product_description_english: `
            * HELPS IN LOSING WEIGHT, IMPROVES GUT HEALTH, LOWERS CHOLESTEROL
            * MANAGES DIABETES, REDUCES BLOOD SUGAR, BOOST METABOLISM
            * PREVENTS HEART DISEASE, REDUCES ALLERGY SYMPTOMS
            * SUPPORTS MENTAL HEALTH, IMPROVES SEXUAL HEALTH
            * ANTITOXIC ACTION`,
            Product_description_hindi: `
            * वजन कम करने में मदद करता है, आंत के स्वास्थ्य में सुधार करता है, कोलेस्ट्रॉल कम करता है
            * मधुमेह का प्रबंधन करता है, रक्त शर्करा को कम करता है, चयापचय को बढ़ावा देता है
            * हृदय रोग को रोकता है, एलर्जी के लक्षणों को कम करता है
            * मानसिक स्वास्थ्य का समर्थन करता है, यौन स्वास्थ्य में सुधार करता है
            * एंटीटॉक्सिक एक्शन`
        },
        {
            Product_name: "ALL TOTAL CAPSULES & Good health is in your hands!!",
            Product_image: `data:image/jpeg;base64,${fs.readFileSync(path.join(assetsPath, "healthforce.png")).toString("base64")}`,
            Product_price: "1200 ₹",
            Product_varient: "",
            Product_tagline:"",
            Product_description_english: `
            * IT IMPROVES BLOOD FLOW, LOWERS OXIDATIVE STRESS IN SMOKERS.
            * IT HAS HIGHEST ANTIOXIDANT ACTIVITY THAN ANY OTHER ANTIOXIDANTS.
            * IT HELPS TO SMOOTH WRINKLES, MAKE AGE SPOTS SMALLER & TO MAINTAIN SKIN MOISTURE.
            * IT CAN AFFECT FATIGUE, BOOST THE BODY'S USE OF FATTY ACIDS, WHICH HELPS ENDURANCE & PREVENT MUSCLE AND SKELETAL DAMAGE.
            * IT CAN BENEFIT HEART HEALTH, BLOOD PRESSURE PROBLEMS, CHOLESTEROL, BRAIN HAEMORRHAGE.
            * IT IS VERY MUCH USEFUL IN SKIN DISEASES, SUN BURN.
            * IT REDUCES INFLAMMATION AND PAIN IN JOINT PAINS, BACK PAIN, CRAMPS.`,
            Product_description_hindi: `
            * यह रक्त प्रवाह में सुधार करता है, धूम्रपान करने वालों में ऑक्सीडेटिव तनाव को कम करता है।
            * इसमें किसी भी अन्य एंटीऑक्सीडेंट की तुलना में उच्चतम एंटीऑक्सीडेंट गतिविधि है।
            * यह झुर्रियों को कम करने, उम्र के धब्बों को छोटा करने और त्वचा की नमी बनाए रखने में मदद करता है।
            * यह थकान को प्रभावित कर सकता है, शरीर के फैटी एसिड के उपयोग को बढ़ावा दे सकता है, जो सहनशक्ति में मदद करता है और मांसपेशियों और कंकाल क्षति को रोकता है।
            * यह हृदय स्वास्थ्य, रक्तचाप की समस्या, कोलेस्ट्रॉल, ब्रेन हेमरेज में लाभ पहुंचा सकता है। यह चर्म रोग, सन बर्न में बहुत उपयोगी है।
            * यह जोड़ों के दर्द, कमर दर्द, ऐंठन में सूजन और दर्द को कम करता है।`
        },
        {
            Product_name: "FEMALE CHOICE CAPSULES  & Good health is in your hands!!",
            Product_image: `data:image/jpeg;base64,${fs.readFileSync(path.join(assetsPath, "healthforce.png")).toString("base64")}`,
            Product_price: "1200 ₹",
            Product_varient: "",
            Product_tagline:"",
            Product_description_english: `
            * SEXUAL ENHANCEMENT SUPPLEMENT REDISCOVER PASSION, DESIRE AND FEELINGS OF AROUSAL WITH YOUR PARTNER
            * SPECIALLY FORMATTED TO COMBAT LOW LIBIDO, MENOPAUSAL SYMPTOMS AND OTHER FACTORS THAT REDUCE SEXUAL DRIVE, OUR FOOD SUPPLEMENT CONTAINS A SPECIAL BLEND OF ALL NATURAL AND EFFECTIVE INGREDIENTS
            * EPICEDIUM HORNY GOAT WEED) WORKS TO INCREASE BLOOD FLOW FOR GREATER SENSITIVITY IN ALL THE RIGHT PLACES
            * BLACK COHOSH HELPS REDUCE HEADACHES, HOT FLASHES, VAGINAL DRYNESS AND OTHER MOOD KILLERS`,
            Product_description_hindi: `
            * यौन वृद्धि पूरक अपने साथी के साथ जुनून, इच्छा और उत्तेजना की भावनाओं को फिर से खोजें
            * कम कामेच्छा, रजोनिवृत्ति के लक्षणों और यौन इच्छा को कम करने वाले अन्य कारकों से निपटने के लिए विशेष रूप से तैयार किया गया, हमारे खाद्य पूरक में सभी प्राकृतिक और प्रभावी अवयवों का एक विशेष मिश्रण होता है
            * एपिसीडियम हॉर्नी बकरी खरपतवार) सभी सही जगहों पर अधिक संवेदनशीलता के लिए रक्त प्रवाह को बढ़ाने का काम करता है
            ब्लैक कोहोश सिरदर्द, गर्म चमक, योनि सूखापन और अन्य मूड किलर को कम करने में मदद करता है`
        },
        {
            Product_name: "MEN'S SOLUTION CAPSULES ",
            Product_image: `data:image/jpeg;base64,${fs.readFileSync(path.join(assetsPath, "healthforce.png")).toString("base64")}`,
            Product_price: "1200 ₹",
            Product_varient: "",
            Product_tagline:"",
            Product_description_english: `
           * THE INGREDIENTS THAT GO INTO FORMULATING STEMOGREENA MARE 100% NATURAL. IT HELP IN INCREASING ENERGY LEVELS IN MALES, ACTS AS A STAMINA BOOSTER, ENERGY BOOSTER, AND CONFIDENCE BOOSTER AND IMPROVES PERFORMANCE
            * PERFORMANCE BOOSTER: APART FROM HELPING MAINTAIN CHOLESTEROL AND IMPROVING MOOD, THIS PRODUCT ALSO BOOSTS STAMINA AND ENERGY
            * IT IS HIGHLY EFFICIENT IN PERFORMING AS A STAMINA BOOSTER AND ENERGY BOOSTER EVERY TIME YOU TAKE THE PILL. GOOD MOOD. IT IS ALSO LINKED WITH REDUCED STRESS AND ANXIETY AND SYMPTOMS OF DEPRESSION. STAMOGREENA M HAS HIGH PSYCHOLOGICALBENEFITS ATTACHED TO THEM
            * IMPROVED IMMUNE SYSTEM: IT IS ALSO EFFECTIVE I MAINTAINING A GOOD AND HEALTHY IMMUNE SYSTEM THEY ARE KNOWN FOR FIGHTING COLD AND SYMPTOMS OF MANY HEALTH CONDITIONS`,
            Product_description_hindi: `
            * स्टैमोग्रीना एम को तैयार करने में उपयोग होने वाली सामग्री 100% प्राकृतिक हैं। यह पुरुषों में ऊर्जा के स्तर को बढ़ाने में मदद करता है, एक सहनशक्ति बूस्टर, ऊर्जा बूस्टर, आत्मविश्वास बूस्टर के रूप में कार्य करता है और प्रदर्शन में सुधार करता है
            * प्रदर्शन बूस्टरः कोलेस्ट्रॉल को बनाए रखने और मूड में सुधार करने में मदद करने के अलावा, यह उत्पाद सहनशक्ति और ऊर्जा को भी बढ़ाता है
            * हर बार जब आप गोली लेते हैं तो यह स्टैमिना बूस्टर और एनर्जी बूस्टर के रूप में कार्य करने में अत्यधिक कुशल है। अच्छा मूड। यह कम तनाव और चिंता और अवसाद के लक्षणों से भी जुड़ा हुआ है। स्टैमोग्रीना एम से जुड़े उच्च मनोवैज्ञानिक लाभ हैं
            * बेहतर प्रतिरक्षा प्रणाली: यह एक अच्छी और स्वस्थ प्रतिरक्षा प्रणाली को बनाए रखने में भी प्रभावी है। वे ठंड से लड़ने और कई स्वास्थ्य स्थितियों के लक्षणों के लिए जाने जाते हैं`
        },
        {
            Product_name: "BERRY PLUS CAPSULES & Good health is in your hands!!",
            Product_image: `data:image/jpeg;base64,${fs.readFileSync(path.join(assetsPath, "healthforce.png")).toString("base64")}`,
            Product_price: "1200 ₹",
            Product_varient: "",
            Product_tagline:"",
            Product_description_english: `
           HEALTH BENEFITS:
            * REJUVENATES YOUR FACE
            * CANCER, ARTHRITIS, HIGH CHOLESTEROL
            * BLOOD CLOTHS, HEART ATTACK
            * STROKE, BLOOD PRESSURE
            * HELP IN CHEMOTHERAPY
            * PARALYSIS, KIDNEY-FAILURE
            * CONTROL CREATININE LEVEL, FATTY LIVER
            * PROSTATE GLAND
            * BODY AND ORGANS BY PROTECTING CELLULAR LONGEVITY`,
            Product_description_hindi: `
            बेरी प्लस के स्वास्थ्य लाभ ः
            * आपके चेहरे को फिर से जीधत करता है
            * कैंसर, वात रोग, उच्च कोलेस्ट्रॉल
            * रक्त के थक्के, दिल का दौरा
            * आघात, रक्तचाप
            * कीमोथेरेपी में मदद
            * पक्षाघात, किडनी
            * क्रिएटिनिन स्तर को नियंत्रित करें
            * फैटी लीवर, प्रोस्टेट ग्रंथि`
        },
        {
            Product_name: "PROCARE WASH ( MEN ) OR PROCARE SPARY FOR MEN",
            Product_image: `data:image/jpeg;base64,${fs.readFileSync(path.join(assetsPath, "healthforce.png")).toString("base64")}`,
            Product_price: "900 ₹",
            Product_varient: "",
            Product_tagline:"",
            Product_description_english: `
            * HELPS IN TREATING ANY INFECTION ITCHING AND PREVENTS THEM FROM HAPPENING AGAIN.
            * PREVENTS UNWANTED ODOR AND KEEPS THE INTIMATE AREA FRESH ROUND THE CORNER.
            * INTIMATE SPARY REDUCES IRRITATION AND INFLAMMATION IN THE INTIMATE AREA AND KEEPS IT PROTECTED.`,
            Product_description_hindi: `
            * खुजली के किसी भी संक्रमण का इलाज करने में मदद करता है और उन्हें दोबारा होने से रोकता है।
            * अवांछित गंध को रोकता है और अंतरंग क्षेत्र को कोने के चारों ओर ताज़ा रखता है।
            * इंटिमेट स्पारी इंटिमेट एरिया में जलन और सूजन को कम करता है और इसे सुरक्षित रखता है।`
        },
        {
            Product_name: "PROCARE WASH (WOMEN)  OR PROCARE FEMININE SPRAY",
            Product_varient: "50ml",
            Product_tagline:"",
            Product_image: `data:image/jpeg;base64,${fs.readFileSync(path.join(assetsPath, "healthforce.png")).toString("base64")}`,
            Product_price: "500 ₹",
            Product_description_english: `
            * TO AVOID ITCHES IN THE VAGINA IT IS RECOMMENDED TO REGULARLY USE VAGINAL WASH
            * INTIMATE WASH KEEPS THE PH LEVEL BALANCED AND PROTECTS THE VAGINA FROM INFECTIONS AND INFLAMMATIONS`,
            Product_description_hindi: `
            * योनि में खुजली से बचने के लिए नियमित रूप से प्रोकेयर स्प्रे का उपयोग करने की सलाह दी जाती है
            * प्रो केयर पीएच स्तर को संतुलित रखता है और योनि को संक्रमण और सूजन से बचाता है`
        },
        {
            Product_name: "PROCARE WASH (WOMEN)  OR PROCARE FEMININE SPRAY",
            Product_varient: "100ml",
            Product_tagline:"",
            Product_image: `data:image/jpeg;base64,${fs.readFileSync(path.join(assetsPath, "healthforce.png")).toString("base64")}`,
            Product_price: "900 ₹",
            Product_description_english: `
            * TO AVOID ITCHES IN THE VAGINA IT IS RECOMMENDED TO REGULARLY USE VAGINAL WASH
            * INTIMATE WASH KEEPS THE PH LEVEL BALANCED AND PROTECTS THE VAGINA FROM INFECTIONS AND INFLAMMATIONS`,
            Product_description_hindi: `
            * योनि में खुजली से बचने के लिए नियमित रूप से प्रोकेयर स्प्रे का उपयोग करने की सलाह दी जाती है
            * प्रो केयर पीएच स्तर को संतुलित रखता है और योनि को संक्रमण और सूजन से बचाता है`
        },
        {
            Product_name: "ALOVERA GEL",
            Product_varient: "",
            Product_tagline:"",
            Product_image: `data:image/jpeg;base64,${fs.readFileSync(path.join(assetsPath, "healthforce.png")).toString("base64")}`,
            Product_price: "120 ₹",
            Product_description_english: `
            * PURE ALOE VERA GEL IS USED IN THIS
            * CAN BE USED AS A FACIAL CLEANSER HELPS REDUCE DARK CIRCLES, BLEMISHES, PIMPLES, ACNE
            * GLOW COMES ON THE FACE
            * EFFECTIVE ON BURNT SPOTS
            * FACIAL INFLAMMATION CAUSED BY ACNE IS REDUCED
            * IF THE GEL IS MIXED WITH COCONUT OIL AND APPLIED TO THE HAIR, IT REDUCES DANDRUFF AND MAKES THE HAIR SOFT`,
            Product_description_hindi: `
            * इसमें शुद्ध एलोवेरा जेल का इस्तेमाल किया जाता है
            * चेहरे की सफाई करने वाले के रूप में इस्तेमाल किया जा सकता है
            * डार्क सर्कल्स, दाग-धब्बे, पिंपल्स, मुंहासों को कम करने में मदद करता है
            * चेहरे पर ग्लो आता है
            * जले हुए स्थान पर असरदार
            * मुंहासों के कारण होने वाली चेहरे की सूजन कम हो जाती है यदि जेल को नारियल के तेल में मिलाकर बालों में लगाया जाए तो यह रूसी को कम करता है और बालों को मुलायम बनाता है`
        },
        {
            Product_name: "NANO CELLULITE GEL",
            Product_varient: "",
            Product_tagline:"",
            Product_image: `data:image/jpeg;base64,${fs.readFileSync(path.join(assetsPath, "healthforce.png")).toString("base64")}`,
            Product_price: "300 ₹",
            Product_description_english: `
            * OUR CELLULITE GEL COMES IN A GORGEOUS ORANGE COLOR. THIS PRODUCT REDUCES CELLULITE, TIGHTENS & FIRMS SKIN, IMPROVES BLOOD CIRCULATION IN AFFECTED PARTS, TONES MUSCLES & MOBILIZE UNWANTED FAT
            * THE USUAL PURPOSES INCLUDE THE ARMS AND THIGH REGION
            * REMEMBER THIS IS NOT FOR APPLICATION ON YOUR FACE, SO DON'T GO AROUND PUTTING SOME AROUND THOSE CHEEKS
            * OTHER THAN THAT THIS PRODUCT IS SUITABLE OR ALL SKIN TYPES
            * HOW TO APPLY-APPLY A THIN LAYER ON YOUR AFFECTED AREA EVERY DAY
            - MASSAGE FOR 15-20 MINUTES
            - LEAVE IT ON FOR A FEW MINUTES, LET IT DRY`,
            Product_description_hindi: `
            * हमारा सेल्युलाईट जेल एक भव्य नारंगी रंग में आता है। यह उत्पाद सेल्युलाईट को कम करता है, त्वचा को कसता है और फर्म करता है, प्रभावित हिस्सों में रक्त परिसंचरण में सुधार करता है, मांसपेशियों को टोन करता है और अवांछित वसा को जुटाता है
            * सामान्य उद्देश्यों में भुजाएँ और जांघ क्षेत्र शामिल हैं
            * याद रखें कि यह आपके चेहरे पर लगाने के लिए नहीं है, इसलिए उन गालों के आस-पास कुछ न लगाएं
            * इसके अलावा यह उत्पाद सभी प्रकार की त्वचा के लिए उपयुक्त है
            * कैसे लगाएं- हर दिन अपने प्रभावित क्षेत्र पर एक पतली परत लगाएं
            - 15-20 मिनट तक मसाज करें
            - इसे कुछ मिनट के लिए लगा रहने दें, सूखने दें`
        },
        {
            Product_name: "PILO HEAL CAPSULES  &  Good health is in your hands!!",
            Product_varient: "",
            Product_tagline:"",
            Product_image: `data:image/jpeg;base64,${fs.readFileSync(path.join(assetsPath, "healthforce.png")).toString("base64")}`,
            Product_price: "1200 ₹",
            Product_description_english: `
            * IT HELPS IN TREATING BLEEDING PILES
            * IT TREATS NON-BLEEDING PILES
            * THESE CAPSULES HELP IN TREATING FISSURES
            * IT TREATS FISTULA
            * IT HELPS EASE DIGESTION
            * SMOOTHENS BOWEL MOVEMENT
            * THE CAPSULES PREVENT CHRONIC CONSTIPATION`,
            Product_description_hindi: `
            * यह खूनी बवासीर के इलाज में मदद करता है
            * यह बवासीर का इलाज करती हैं 
            * ये कैप्सूल फिशर के इलाज में मदद करते हैं
            * यह फिस्टुला का इलाज करता है
            * यह पाचन को आसान बनाने में मदद करता है
            * मल त्याग को सुचारू करता है
            * कैप्सूल पुरानी कब्ज को रोकता है`
        },
        {
            Product_name: "CALYCURE CAPSULE &  Good health is in your hands!!",
            Product_varient: "",
            Product_tagline:"",
            Product_image: `data:image/jpeg;base64,${fs.readFileSync(path.join(assetsPath, "healthforce.png")).toString("base64")}`,
            Product_price: "1200 ₹",
            Product_description_english: `
            * HELPS IN ALL KIND OF KIDNEY STONE PIANS
            * HELPS IN DISSOLVE KIDNEY STONE
            * HELPS IN URINARY TRACT INFECTIONS
            * HELPS TO FLUSH KIDNEY STONE
            * HELPS TO STOP KIDNEY STONE HABITS OF KIDNEY
            * HELPS TO REGENERATE DAMAGED NEFRONS IN KIDNEY`,
            Product_description_hindi: `
            * सभी प्रकार की किडनी स्टोन पियान्स में मदद करता है
            * गुर्दे की पथरी को घोलने में मदद करता है
            * मूत्र पथ के संक्रमण में मदद करता है
            * किडनी स्टोन को बाहर निकालने में मदद करता है
            * किडनी की पथरी की आदतों को रोकने में मदद करता है
            * किडनी में क्षतिग्रस्त नेफ्रॉन को पुनर्जीवित करने में मदद करता है`
        },
        {
            Product_name: "LIVERCARE CAPSULES &  Good health is in your hands!!",
            Product_varient: "",
            Product_tagline:"",
            Product_image: `data:image/jpeg;base64,${fs.readFileSync(path.join(assetsPath, "healthforce.png")).toString("base64")}`,
            Product_price: "1200 ₹",
            Product_description_english: `
            * DETOXIFY THE LIVER AND KIDNEYS
            * PROMOTE OVERALL LIVER HEALTH
            * OPTIMIZE LIVER FUNCTION
            * PROTECT LIVER CELLS FROM INFLAMMATION
            * PROMOTE THE PRODUCTION OF BILE
            INCREASE METABOLISM AND PROMOTE WEIGHT LOSS
            * SUPPORT RESPIRATORY AND IMMUNE SYSTEM FUNCTION`,
            Product_description_hindi: `
            * लीवर और किडनी को डिटॉक्स करता है
            * समग्र यकृत स्वास्थ्य को बढ़ावा देता है
            * यकृत समारोह का अनुकूलन करता है
            * लिवर की कोशिकाओं को सूजन से बचाता है
            * पित्त उत्पादन को उत्तेजित करता है
            * पाचन बढ़ाता है और वजन घटाने को बढ़ावा देता है
            * श्वसन और प्रतिरक्षा प्रणाली समारोह का समर्थन करता है`
        },
        {
            Product_name: "CARDIOCARE CAPSULES & good health is in your hands!!",
            Product_varient: "",
            Product_tagline:"",
            Product_image: `data:image/jpeg;base64,${fs.readFileSync(path.join(assetsPath, "healthforce.png")).toString("base64")}`,
            Product_price: "1200 ₹",
            Product_description_english: `
            * HELPS IN ATHEROSCLEROSIS (HARDING OF VEINS AND ARTARIES)
            * HELPS TO LOWER LDL
            * HELPS TO IMPROVE HDL
            * HELPS TO MAINTAIN BLOOD FLOW
            * HELPS TO PURIFY BLOOD`,
            Product_description_hindi: `
            * एथेरोस्क्लेरोसिस (नसों और धमनियों का सख्त होना) में मदद करता है
            * एलडीएल को कम करने में मदद करता है
            * एचडीएल को बेहतर बनाने में मदद करता है
            * रक्त प्रवाह को बनाए रखने में मदद करता है
            * रक्त को शुद्ध करने में मदद करता है`
        },
        {
            Product_name: "XEROFIT CAPSULES & good health is in your hands!!",
            Product_varient: "",
            Product_tagline:"",
            Product_image: `data:image/jpeg;base64,${fs.readFileSync(path.join(assetsPath, "healthforce.png")).toString("base64")}`,
            Product_price: "1200 ₹",
            Product_description_english: `
            1. BURN FATS IN BODY
            2. REDUCE WEIGHT
            3. IMPROVE METABOLISM
            4. SOURCE OF NATURAL FIBERS
            5. REDUCE BELLY FAT IN VERY LESS PERIOD`,
            Product_description_hindi: `
            * शरीर की चर्बी को कम करता है
            * वजन कम करता है
            * मेटाबोलिज्म में सुधार करता है
            * प्राकृतिक रेशों का स्रोत
            * पेट की चर्बी को बहुत कम समय में कम करता है`
        },
        {
            Product_name: "ALL IN ONE CAPSULES & good health is in your hands!!",
            Product_varient: "",
            Product_tagline:"",
            Product_image: `data:image/jpeg;base64,${fs.readFileSync(path.join(assetsPath, "healthforce.png")).toString("base64")}`,
            Product_price: "1200 ₹",
            Product_description_english: `
            ADVANTAGES:
            1. ALL BODY DETOXIFIER
            2. IMMUNITY BOOSTER
            3. ALL KIND OF JOINT PAIN
            4. RHEUMATOID ARTHRITES PAIN
            5. OSTEOARTHRITIS PAIN
            6. MUSCLE PAIN
            7. DIABETIS
            8. KIDNEY STONE
            9. HARMONAL BALANCE
            10. BLOOD PURIFIER
            11. DIGETSION
            12. ALL VITAL ORGAN PROTECTION
            13. SUPER ANTIOXIDANT
            14. SKIN GLOW
            15. HAIR FALL`,
            Product_description_hindi: `
            * संपूर्ण शरीर विषहरणकारी
            * रोग प्रतिरोधक क्षमता बढ़ाने वाला
            * सभी प्रकार के जोड़ों का दर्द गठिया का दर्द
            * ऑस्टियोआर्थराइटिस दर्द मांसपेशियों में दर्द
            * मधुमेह
            गुर्दे की पथरी
            * हार्मोनल संतुलन
            रक्त शोधक
            * पाचन
            * सभी महत्वपूर्ण अंगों की सुरक्षा
            * सुपर एंटीऑक्सीडेंट
            त्वचा की चमक
            * बालों का झड़ना`
        },
        {
            Product_name: "ALL TOTAL OIL",
            Product_varient: "",
            Product_tagline:"",
            Product_image: `data:image/jpeg;base64,${fs.readFileSync(path.join(assetsPath, "healthforce.png")).toString("base64")}`,
            Product_price: "750 ₹",
            Product_description_english: `
            * IT HELPS TO MAKE BONES STRONG
            * IT HELPS TO REDUCE RIGIDITY OF BONES
            * IT HELPS TO REDUCE PAIN IN ARTHRITICS
            * IT HELPS TO REDUCE PAIN IN BACKBONE
            * IT HELPS TO REDUCE PAIN IN NECK
            * IT HELPS TO REDUCE SCIATICA PAIN
            * IT HELPS TO REDUCE JOIN PAINS`,
            Product_description_hindi: `
            * यह हड्डियों को मजबूत बनाने में मदद करता है
            * यह हड्डियों की कठोरता को कम करने में मदद करता है
            * यह गठिया के दर्द को कम करने में मदद करता है
            * यह रीढ़ की हड्डी में दर्द कम करने में मदद करता है
            * यह गर्दन के दर्द को कम करने में मदद करता है
            * यह साइटिका के दर्द को कम करने में मदद करता है
            * यह जोड़ों के दर्द को कम करने में मदद करता है`
        },
        {
            Product_name: "SHARKARADI CAPSULES",
            Product_varient: "",
            Product_tagline:"",
            Product_image: `data:image/jpeg;base64,${fs.readFileSync(path.join(assetsPath, "healthforce.png")).toString("base64")}`,
            Product_price: "1599 ₹",
            Product_description_english: `
            * SUGAR CAPSULES ARE A NATURAL PRODUCT.
            * HELPS CONTROL ELEVATED SUGAR LEVELS IN DIABETES.
            * SIDE EFFECTS IN DIABETES LIKE KIDNEY FAILURE, LIVER FAILURE, LOSS OF VISION IT HELPS TO AVOID SUCH SIDE EFFECTS.
            * LIVER HELPS TO PURIFY ORGANS LIKE KIDNEYS.
            * HELPS PURIFY THE BLOOD.`,
            Product_description_hindi: `
            * शुगर कैप्सूल एक प्राकृतिक उत्पाद है।
            * मधुमेह में बढ़े हुए शुगर लेवल को नियंत्रित करने में मदद करता है।
            * मधुमेह में होने वाले साइड इफ़ेक्ट जैसे किडनी फेलियर, लिवर फेलियर, दृष्टि की हानि, यह ऐसे साइड इफ़ेक्ट से बचने में मदद करता है।
            * लिवर किडनी जैसे अंगों को शुद्ध करने में मदद करता है।
            * रक्त को शुद्ध करने में मदद करता है।`
        },
        {
            Product_name: "BALYAMITRA POWDER",
            Product_varient: "",
            Product_tagline:"",
            Product_image: `data:image/jpeg;base64,${fs.readFileSync(path.join(assetsPath, "healthforce.png")).toString("base64")}`,
            Product_price: "1599 ₹",
            Product_description_english: `
            * HELPS CHILDREN DEVELOP A GOOD APPETITE.
            * IT HELPS IN PHYSICAL AND INTELLECTUAL DEVELOPMENT.
            * INCREASES IMMUNITY.
            * BEING SULFATE FREE SUGAR I.E. GLUCOSE, KIDS GET INSTANT ENERGY AND KIDS BECOME MORE ACTIVE.
            * NOWADAYS THE BRAIN DEVELOPMENT OF CHILDREN 1.E. INTELLECTUAL DEVELOPMENT IS HAPPENING VERY FAST. BUT DUE TO SOME HEREDITARY AND FAST FOOD EATING HABITS, CHILDREN'S IMMUNE SYSTEM, DIGESTIVE CAPACITY AND PHYSICAL CAPACITY ARE DECREASING. OVERALL, BALYAKALP ACTS AS AN ENERGY BOOSTER FOR CHILDREN AN HELPS IN IMPROVING THE PHYSICAL ABILITIES OF CHILDREN.
            * SINCE IT HAS CHOCOLATE FLAVOR (TASTELESS AND ODORLESS), CHILDREN WILL LOVE TO EAT IT.`,
            Product_description_hindi: `
            * बच्चों को अच्छी भूख विकसित करने में मदद करता है।
            * यह शारीरिक और बौद्धिक विकास में मदद करता है।
            * रोग प्रतिरोधक क्षमता बढ़ाता है।
            * सल्फेट मुक्त शर्करा यानी ग्लूकोज होने के कारण बच्चों
            * को तुरंत ऊर्जा मिलती है और बच्चे अधिक सक्रिय बनते हैं।
            * आजकल बच्चों का मस्तिष्क विकास यानी बौद्धिक विकास बहुत तेजी से हो रहा है। लेकिन कुछ वंशानुगत और फास्ट फूड खाने की आदतों के कारण बच्चों की प्रतिरक्षा प्रणाली, पाचन क्षमता और शारीरिक क्षमता कम हो रही है। कुल मिलाकर, बाल्यकल्प बच्चों के लिए ऊर्जा बढ़ाने वाले के रूप में कार्य करता है और बच्चों की शारीरिक क्षमताओं को बेहतर बनाने में मदद करता है।
            * चूंकि इसमें चॉकलेट का स्वाद (स्वादहीन और गंधहीन) होता है, इसलिए बच्चे इसे खाना पसंद करेंगे।`
        },
        {
            Product_name: "PRO SHARKADI OIL",
            Product_varient: "",
            Product_tagline:"",
            Product_image: `data:image/jpeg;base64,${fs.readFileSync(path.join(assetsPath, "healthforce.png")).toString("base64")}`,
            Product_price: "900 ₹",
            Product_description_english: `
            * Helps heal wounds caused by diabetes.
            * Useful in healing inflamed wounds.
            * Helpful in reducing wound infection.
            * Helps to adapt the bones of a diabetic patient.
            * Helps to reduce swelling in the wound.
            * Helps to prevent gangrene.`,
            Product_description_hindi: `
            * मधुमेह के कारण हुए घावों को ठीक करने में मदद करता है
            * सूजन वाले घावों को ठीक करने में उपयोगी
            * घाव के संक्रमण को कम करने में सहायक
            * मधुमेह रोगी की हड्डियों को अनुकूल बनाने में मदद करता है
            * घाव में सूजन को कम करने में मदद करता है
            * गैंग्रीन को रोकने में मदद करता है`
        },
        {
            Product_name: "PRO SHARKARADI CAPSULES",
            Product_varient: "",
            Product_tagline:"",
            Product_image: `data:image/jpeg;base64,${fs.readFileSync(path.join(assetsPath, "healthforce.png")).toString("base64")}`,
            Product_price: "1599 ₹",
            Product_description_english: `
            1 Gum: Improves digestion and helps control sugar levels in diabetics. 2. Turmeric: Helps wound healing in diabetics. Reduces urinary tract infections. 
            3. Ashwagandha: Protects against diabetes by reducing the sugar level in the body. 
            4. Gulvel is beneficial in controlling blood sugar levels. So diabetes can be prevented. Increases immunity. 
            5. Gudmar (Mandulashini): Helps the body to better control blood glucose levels through several mechanisms. According to the NIH, the gymnemic acid in it inhibits glucose absorption and delays sugar spikes. 
            6. Neem: Neem helps in controlling diabetes. It controls hypoglycemic blood sugar. 
            7. Fenugreek: Contains probiotics. These properties reduce bad cholesterol in the body without affecting it. Apart from this, they also work to lower blood sugar levels, thereby preventing the risk of diabetes. Fenugreek seeds contain alkaloids, which are known as a panacea for diabetes: 
            8. Jira: Used to soothe the digestive system, relieve nausea and constipation as a remedy for stomach problems. Also, they are regularly used for digestion, but cumin is also used as an adjunctive treatment along with medication for people with type 2 diabetes 
            9. Goharu: Helps lower blood sugar levels. Protects kidneys in diabetic patients.`,
            Product_description_hindi: `
            1. गोंद: पाचन में सुधार करता है और मधुमेह रोगियों में शर्करा के स्तर को नियंत्रित करने में मदद करता है 
            2. हल्दीः मधुमेह रोगियों में घाव स्रने में मदद करती है। मूत्र पथ के संक्रमण को कम करती है 
            3. अश्वगंधाः शरीर में शुगर लेवल को कम करके डायबिटीज से बचाता है 
            4. गुलवेल ब्लड शुगर लेवल को नियंत्रित करने में फायदेमंद है तो मधुमेह से बचा जा सकता है रोग प्रतिरोधक क्षमता बढ़ाता है 
            5. गुहमार (मंडलाशिनी): शरीर को कई तंत्रों के माध्यम से रक्त शर्करा के स्तर को बेहतर ढंग से नियंत्रित करने में मदद करता है। एनआईएच के अनुसार, इसमें मौजूद जिम्नेमिक एसिड ग्लूकोज अवशोषण को रोकता है और शुगर बढ़ने में देरी करता है 
            6. नीमः नीम मधुमेह को नियंत्रित करने में मदद करता है। यह हाइपोग्लाइसेमिक ब्लड शुगर को नियंत्रित करता है। 
            7. मेथीः इसमें प्रोबायोटिक्स होते हैं। ये गुण शरीर में खराब कोलेस्ट्रॉल को बिना प्रभावित किए कम करते हैं। इसके अलावा, ये रक्त शर्करा के स्तर को कम करने का भी काम करते हैं, जिससे मधुमेह के खतरे को रोका जा सकता है। मेथी के दानों में एल्कलॉइड्स पाए जाते हैं, जो मधुमेह के लिए रामबाण माने जाते हैं: 
            8. जीराः पेट की समस्याओं के इलाज के रूप में पाचन तंत्र को शांत करने, मतली और कब्ज से राहत देने के लिए उपयोग किया जाता है। इसके अलावा, इन्हें नियमित रूप से पाचन के लिए उपयोग किया जाता है, लेकिन टाइप 2 मधुमेह वाले लोगों के लिए दवा के साथ-साथ जीरे का उपयोग सहायक उपचार के रूप में भी किया जाता है 
            9. गोहारुः रक्त शर्करा के स्तर को कम करने में मदद करता है। मधुमेह के रोगियों में गुर्दे की रक्षा करता है।`
        },
    ];

    try {
        await productModel.insertMany(dummyProducts);
        console.log("Dummy products added successfully!");
    } catch (error) {
        console.error("Error adding dummy products:", error);
    } finally {
        mongoose.disconnect();
    }
}

addDummyProducts();