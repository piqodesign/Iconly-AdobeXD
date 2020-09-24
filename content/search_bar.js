let url = require.resolve("../src/Search.svg")

function keyUpCallback(val){
    console.log(val);
}

module.exports = {
    createSearchBar(){
        Object.assign(document.body.style , {
            width: "100%",
            height: "100%",
        });

        const panel = document.createElement("div");
        Object.assign(panel.style , {
            display : "flex",
            width : "100%",
            height : "100%",
            flexDirection: "row",
            alignItems: "center",
            padding : "6px"
        })

        let img = document.createElement("img");
        Object.assign(img.style , {
            width : "16px",
            height: "16px"
        })
        img.setAttribute("src", url);

        panel.appendChild(img);

        let textField = require("./textField.js");
        let input = new textField();
        let root = input.render(keyUpCallback);
        Object.assign(root.style , {
            margin : "0 6px" ,
            width :"100%",
            marginTop : "0px"
        });
        panel.appendChild(root);
        return panel;
    }
}