let types = [
    "Bold",
    "Broken",
    "Bulk",
    "Light",
    "Light-outline",
    "Two-tone"
]

let url = require.resolve("../src/Search.svg")


module.exports = {
    fillIcons(){
        let container = document.createElement("div");
        Object.assign(container.style , {
            width : "100%",
            height: "100%"
        })

        types.forEach(type => {
            let header = document.createElement("h4");
            header.textContent = type;
            container.appendChild(header);

            let icons = document.createElement("div");
            Object.assign(icons.style , {
                display : "flex",
                flexWrap : "wrap"
            })

            for (let index = 0; index < 24; index++) {
                const img = document.createElement("div");
                // img.setAttribute("src" , url)
                Object.assign(img.style , {
                    width : "36px",
                    height : "36px",
                    padding : "8px"
                })
                img.innerHTML = `
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
                icons.appendChild(img);
            }
            container.appendChild(icons);

        });

        return container;
    }
}