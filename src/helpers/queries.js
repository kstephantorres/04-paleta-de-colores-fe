const URL_colores = import.meta.env.VITE_API_COLORES
const URL_color = import.meta.env.VITE_API_COLOR
console.log("🚀 ~ URL_color:", URL_color)

console.log("🚀 ~ URL_colores:", URL_colores)

export const leerColoresAPI = async()=>{
    try {
        const response = await fetch(URL_colores)
        const listaColores = await response.json()
        return listaColores
        
    } catch (error) {
        console.log("🚀 ~ leerColoresAPI ~ error:", error)
        
    }
}
const hexToRgb=(hex)=> {
    
    const hexRegex = /^[0-9a-fA-F]{6}$/;
    if (!hexRegex.test(hex)) {
        alert("El color ingresado no cumple con el formato hexadecimal")
    }

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return { r, g, b };
}
function hexToName(hex) {
    const colorNames = {
        "7FFFD4": "aquamarine",
        "F5F5DC": "beige",
        "A52A2A": "brown",
        "000000": "black",
        "D2691E": "chocolate",
        "FF7F50": "coral",
        "00BFFF": "deepskyblue",
        "FFD700": "gold",
        "E6E6FA": "lavender",
        "ADD8E6": "lightblue",
        "F08080": "lightcoral",
        "E0FFFF": "lightcyan",
        "D3D3D3": "lightgray",
        "90EE90": "lightgreen",
        "FFB6C1": "lightpink",
        "000080": "navy",
        "FFC0CB": "pink",
        "0000FF": "blue",
        "008000": "green",
        "008080": "teal",
        "00FF00": "lime",
        "00FFFF": "aqua",
        "800000": "maroon",
        "800080": "purple",
        "808000": "olive",
        "808080": "gray",
        "C0C0C0": "silver",
        "FF0000": "red",
        "FF00FF": "fuchsia",
        "EE82EE": "violet",
        "FFFF00": "yellow",
        "FFFFFF": "white"
    };

    // Verificar si el valor hexadecimal está en el objeto cssColorNames
    if (colorNames.hasOwnProperty(hex.toUpperCase())) {
        return colorNames[hex.toUpperCase()];
    } else {
        return hex;
    }
        
}

export const crearColorAPI = async(colorNuevo)=>{
    try {
        const response = await fetch(URL_colores, {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                nombre: hexToName(colorNuevo.trim()),
                hexadecimal: colorNuevo.trim(),
                rgb: hexToRgb(colorNuevo.trim())
            })
        })
        return response;
    } catch (error) {
        console.log("🚀 ~ crearTareaAPI ~ error:", error)
    }
} 

export const borrarColorAPI=async(id)=>{
    try {
        const response = await fetch(`${URL_color}/${id}`, {
            method: "DELETE"
        })
        console.log("🚀 ~ borrarColorAPI ~ response:", response)
        return response;
    } catch (error) {
        console.log("🚀 ~ borrarColorAPI ~ error:", error)
    }
}

export const editarColorAPI = async(id, color)=>{
    try {
        const response = await fetch(`${URL_color}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type":"application/json"
            }, 
            body: JSON.stringify({
                nombre: hexToName(color.trim()),
                hexadecimal: color.trim(),
                rgb: hexToRgb(color.trim())
            })
        })
        return response;
    } catch (error) {
        console.log("🚀 ~ editarColorAPI ~ error:", error)
    }
} 