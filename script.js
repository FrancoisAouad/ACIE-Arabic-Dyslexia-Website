var sawttawil=["و","ي","ا"];
var sawtkasir=["\u064B","\u064C","\u064D","\u064E","\u064F","\u0650"];
var a7rof=["ت","ث","ر","ز","د","ذ","ل","س","ش","ن","ض","ص","ض","ظ","ط","أ","ب","م","ق","ف","ك","ي","و","ه","ج","ح","خ","ع","غ","ؤ","ئ","ء","إ","آ"];
var soukoun="\u0652";
var a7rofkamar=["أ","ب","م","ق","ف","ك","ي","و","ه","ج","ح","خ","ع","غ"];
var a7rofchames=["ت","ث","ر","ز","د","ذ","ل","س","ش","ن","ض","ص","ض","ظ","ط"];
var shadda="\u0651";
var alef="ا";

function syllabllate() {
    var gettext, text, generatedtext="";
    gettext = document.getElementById("text").value;
  
    var currentcolor=0;
    
    document.getElementById("result").innerHTML="";
  
  for(var i=0;i<gettext.length;i++)
  { 
    var x = document.createElement("SPAN");
    x.className = "spanstyle";
    var fill;
    x.style.fontSize=45;

  if(currentcolor%2==0)
    x.style.color="black";
  else
    x.style.color="red";

    if(gettext.slice(i,i+1)===" ")//checks if the current letter is a space then skips this letter
    {
          fill=document.createTextNode(" ");
          x.appendChild(fill);
          console.log(fill.textContent);
          document.getElementById("result").appendChild(x);
          currentcolor++;
          continue;
      continue;
    }
    if(a7rof.includes(gettext.slice(i,i+1)))//checks if the current letter is a letter
    {  
      
      if(sawtkasir.includes(gettext.slice(i+1,i+2)))//if the next letter is a sawtkasir
      { 
        if(gettext.slice(i+2,i+3)==".")
        {
          fill=document.createTextNode(gettext.slice(i,i+4));
          x.appendChild(fill);
          console.log(fill.textContent);
          document.getElementById("result").appendChild(x);
          currentcolor++;
          i+=3;
          continue;
        }
        if(sawtkasir.includes(gettext.slice(i+3,i+4))||shadda.includes(gettext.slice(i+3,i+4))) //if next letter has sawtkasir or shadda we only take first letter
        {
          fill=document.createTextNode(gettext.slice(i,i+2));
          x.appendChild(fill);
          console.log(fill.textContent);
          document.getElementById("result").appendChild(x);
          currentcolor++;
          i+=1;
          continue;
        }
        else if(gettext.slice(i+3,i+4)==soukoun)//also if the letter after has a soukoun we end the syallble here at soukoun
        {
          fill=document.createTextNode(gettext.slice(i,i+4));
          console.log(fill.textContent);
          x.appendChild(fill);
          document.getElementById("result").appendChild(x);
          currentcolor++;
          i+=3;
          continue;
        }
        else if(sawtkasir.includes(gettext.slice(i+4,i+5)))// if the letter after the space has a sawtkasir
        {
          fill=document.createTextNode(gettext.slice(i,i+2));
          console.log(fill.textContent);
          x.appendChild(fill);
          document.getElementById("result").appendChild(x);
          fill=document.createTextNode(" ");
          console.log(fill.textContent);
          x.appendChild(fill);
          document.getElementById("result").appendChild(x);
          currentcolor++;
          i+=1;
          continue;
        }
        else if(sawttawil.includes(gettext.slice(i+3,i+4))) //  if the letter after has a sawtkasir
        {
          fill=document.createTextNode(gettext.slice(i,i+2));
          console.log(fill.textContent);
          x.appendChild(fill);
          document.getElementById("result").appendChild(x);
          currentcolor++;
          i+=1;
         continue;
        }
        else if(sawttawil.includes(gettext.slice(i+4,i+5)))
        {
          fill=document.createTextNode(gettext.slice(i,i+2));
          console.log(fill.textContent);
          x.appendChild(fill);
          document.getElementById("result").appendChild(x);
          currentcolor++;
          i+=1;
         continue;
        }
        else if(gettext.slice(i+5,i+6)==soukoun)//it means there is space and al at the start of new word with kamare so we take both
        {
          fill=document.createTextNode(gettext.slice(i,i+5));
          console.log(fill.textContent);
          x.appendChild(fill);
          document.getElementById("result").appendChild(x);
          currentcolor++;
          i+=4;
          continue;
        }   
      }
      else if(sawttawil.includes(gettext.slice(i+1,i+2)))// if it has sawt tawil then we only check if it ends with a letter with soukoun or alef
      {
        if(gettext.slice(i+3,i+4)==soukoun)//also if the letter after has a soukoun we end the syallble here at soukoun
        {
          fill=document.createTextNode(gettext.slice(i,i+4));
          console.log(fill.textContent);
          x.appendChild(fill);
          document.getElementById("result").appendChild(x);
          currentcolor++;
          i+=3;
          continue;
        }
        else if(gettext.slice(i+2,i+3)==alef)//we check if it ends with alef
        {
          fill=document.createTextNode(gettext.slice(i,i+3));
          console.log(fill.textContent);
          x.appendChild(fill);
          document.getElementById("result").appendChild(x);
          fill=document.createTextNode(" ");
          console.log(fill.textContent);
          x.appendChild(fill);
          document.getElementById("result").appendChild(x);
          currentcolor++;
          i+=2;
          continue;
        }
        else
        {fill=document.createTextNode(gettext.slice(i,i+2));
          console.log(fill.textContent);
          x.appendChild(fill);
          document.getElementById("result").appendChild(x);
          currentcolor++;
          i+=1;
          continue;
        }
      }
      else if(gettext.slice(i+1,i+2)==shadda)// if the letter has a shadda we follow almost the same steps but we add +1 to everything
      {
        if(sawtkasir.includes(gettext.slice(i+2,i+3)))
        {
          if(gettext.slice(i+5,i+6)==soukoun)
          {
            fill=document.createTextNode(gettext.slice(i,i+6));
            console.log(fill.textContent);
            x.appendChild(fill);
            document.getElementById("result").appendChild(x);
            currentcolor++;
            i+=5;
            continue;
          }           
          else
          {fill=document.createTextNode(gettext.slice(i,i+3));
            console.log(fill.textContent);
            x.appendChild(fill);
            document.getElementById("result").appendChild(x);
            currentcolor++;
            i+=2;
            continue;
          }
        }
        else if(sawttawil.includes(gettext.slice(i+2,i+3)))// if it has sawt tawil then we only check if it ends with a letter with soukoun or alef
        {
          
          if(gettext.slice(i+3,i+4)==alef)//we check if it ends with alef
          {
            fill=document.createTextNode(gettext.slice(i,i+4));
            console.log(fill.textContent);
            x.appendChild(fill);
            document.getElementById("result").appendChild(x);
            currentcolor++;
            i+=3;
            continue;
          }
          else
          {
            fill=document.createTextNode(gettext.slice(i,i+3));
            console.log(fill.textContent);
            x.appendChild(fill);
            document.getElementById("result").appendChild(x);
            currentcolor++;
            i+=2;
            continue;
          }
        }
      }
    }
    
    
    else// it means the current letter is a ا since it is not inlcuded in letters list then we check if next is kamare or chamse 
    {
      
      if(a7rofkamar.includes(gettext.slice(i+3,i+4)))// if there is 7arf kamare after l then we take only al 
      {
        i+=1;
       continue;
      }
      else //if ahrof chames
      {
        if(gettext.slice(i+7,i+8)==soukoun)
        {
          fill=document.createTextNode(gettext.slice(i,i+8));
          console.log(fill.textContent);
          x.appendChild(fill);
          document.getElementById("result").appendChild(x);
          currentcolor++;
          i+=7;
          continue;
        }
        else if(sawttawil.includes(gettext.slice(i+5,i+6)))
        {fill=document.createTextNode(gettext.slice(i,i+6));
          console.log(fill.textContent);
          x.appendChild(fill);
          document.getElementById("result").appendChild(x);
          currentcolor++;
          i+=5;
          continue;
        }
        else
        {
          fill=document.createTextNode(gettext.slice(i,i+5));
          console.log(fill.textContent);
          x.appendChild(fill);
          document.getElementById("result").appendChild(x);
          currentcolor++;
          i+=4;
          continue;
        }
      }
    }
  }
}
 