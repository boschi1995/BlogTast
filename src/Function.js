export function StringSub(char,address)
{
    var result = [];
    var tem = 0;
    for(var i=0; i <= address.length; i++)
    { 
        if(address[i] != char)
        { 
            if(address.length == i) { result.push(address.substring(tem)); } else { continue; }
        } 
        else 
        {
            result.push(address.substring(tem,i));
            tem = i +1;
        } 
    }
    return result;
}
