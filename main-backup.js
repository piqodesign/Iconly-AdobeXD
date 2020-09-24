const searchBar = require("./content/search_bar.js");
const icons = require("./content/fill_icons.js");
const { pathThatSvg } = require('./node_modules/path-that-svg/dist/pathThatSvg.cjs')
const { selection } = require("scenegraph");
module.exports = {
    commands : {
        showIcons : ()=>{
            let dialog = document.createElement("dialog");
            let pluginArea = document.createElement("div");
            Object.assign(pluginArea.style, {
                display: "flex",
                width: 390,
                height: 500,
                flexDirection: "column",
                alignItems: "stretch",
                justifyContent: "space-between"
            });
            dialog.appendChild(pluginArea);

            let topBar = document.createElement("div");
            Object.assign(topBar.style , {
                height : "50px",
                width : "100%"
            })

            topBar.appendChild(searchBar.createSearchBar());

            pluginArea.appendChild(topBar);

            let list = document.createElement("div");
            Object.assign(list.style , {
                overflow : "auto",
                display : "flex",
                flexWrap : "wrap",
                width: "100%",
                height : "100%"
            });


            list.appendChild(icons.fillIcons());

            pluginArea.appendChild(list);

            let buttonArea = document.createElement("div");
            Object.assign(buttonArea.style, {
                id: "button-area",
                display: "flex",
                width: "100%",
                marginTop: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end"
            });
            pluginArea.appendChild(buttonArea);

            let closeButton = document.createElement("button");
            closeButton.setAttribute("uxp-variant", "cta");
            closeButton.textContent = "Close";
            closeButton.addEventListener("click", (ev)=> {
                dialog.close();
            });
            buttonArea.appendChild(closeButton);
            let svg = `
            <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <!-- Generator: Sketch 64 (93537) - https://sketch.com -->
                <title>@1xIconly/Light/Search</title>
                <desc>Created with Sketch.</desc>
                <g id="Iconly/Light/Search" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                    <g id="Search" transform="translate(2.000000, 2.000000)" stroke="#200E32" stroke-width="1.5">
                        <circle id="Ellipse_739" cx="9.76659044" cy="9.76659044" r="8.9885584"></circle>
                        <line x1="16.0183067" y1="16.4851259" x2="19.5423342" y2="20.0000001" id="Line_181"></line>
                    </g>
                </g>
            </svg>
            `;
            pathThatSvg(svg).then((convertedFromString) => {
                console.log(convertedFromString)
            })

            document.body.appendChild(dialog);
            dialog.showModal();
        }
    }
}