let wordTitle = document.getElementById("title");
let wordMeaning = document.getElementById("meaning");
let audio = document.getElementById("audio");
let input = document.getElementById("input");
let header = document.querySelector(".header");
let meaningDiv = document.querySelector(".meaning-container");
let guide = document.querySelector(".teach");
//===================================================================================
async function fetchAPI(word){
    try{

        guide.style = "display : block";
        meaningDiv.style = "display : none";
        guide.innerText = `Searching the meaning of "${word}"`;
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        const result =await fetch(url).then((Res)=>Res.json());
        if(result.title){
            meaningDiv.style = "display : block";
            guide.style = "display : none";
            wordTitle.innerText = word;
            wordMeaning.innerText = "Not exist in dictionary";
            wordMeaning.style = "color:red"
            audio.style = "display : none";
        }
        else{
            guide.style = "display : none";
            meaningDiv.style = "display : block";
            audio.style = "display : inline-flex";
            wordTitle.innerText = result[0].word;
            wordMeaning.innerText = result[0].meanings[0].definitions[0].definition;
            audio.src = result[0].phonetics[0].audio;
        }
    }
    catch(error){
        console.log(error);
        guide.innerText = `Error happened`;
    }

}

input.addEventListener('keyup', (e)=> {

    if(e.target.value && e.key === "Enter" ){
        
        fetchAPI(e.target.value);
        if (e.target.value.length >45)
        {
            alert("Out Of Text")};
    }       
    else if (e.target.value == ""){   
        wordTitle.innerHTML = "___";
        meaningDiv.style = "display : none";
        

    }
    
});

