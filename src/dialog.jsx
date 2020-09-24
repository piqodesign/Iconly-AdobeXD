// [1]
let axios =  require("axios");
const React = require("react");
const { shell } = require("uxp");
const PasteDialog = require("./content/paste_dialog.jsx");
// [2]
const { Text, Color , selection } = require("scenegraph");
// const icons = require("./icons.jsx").default;
let base_url = "https://piqo.design/iconly/api/";


let style = require("./styles.css");
let close_icon = require.resolve("./close.svg")
let not_found_img = require.resolve("./not_found.png")

//# sourceMappingURL=md5.min.js.map

// [3]
class Iconly extends React.Component {
  // [4]
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      c_type : "Bold",
      icons_json : [],
      found : true,
      result_icons : [],
      showPaste : false,
      showLoading : true,
      showConnectionError : false,
      types : [],
      piqo_link : "",
      icon_request : "",
    }; // [5]

    // [6]
    this.onInputChange = e => {
      this.setState({ search: e.target.value.toLowerCase() });
    };

    this.setType = type => {
      this.setState({c_type : type});
    }

    this.getIcon = icon => {
      let svg = icon;
      
      let clipboard = require("clipboard");
      clipboard.copyText(svg);
      this.setState({showPaste : true});
    }

    this.onCloseBtn = e => {
      props.dialog.close();
    }


    this.bodyStyles = {
      width: "300px",
      height: "475px",
      overflow: "auto",
    };

    this.loadIcons();
  }


  componentDidUpdate(prevProps,prevState) {    
    if (this.state.search !== prevState.search || this.state.c_type !== prevState.c_type || this.state.showLoading != prevState.showLoading) {
      this.getIcons();
    }
  }
  
getIcons(){
  let list = this.state.icons_json.find(k => k.name == this.state.c_type);
  if(list){
    list = list.icons;
  }else{
    return;
  }
  let result = list.filter(k => k.tags.toLowerCase().includes(this.state.search));
  let icons = [];
  result.forEach(k => {
      icons.push({name : k.name , icon : k.icon});
  });
  this.checkIconFound(icons);
  this.setState({result_icons : icons});
}


loadIcons (){
  axios({
      method : "get",
      url : base_url + "total?cat=essential&id="+(new Date().getTime())
  }).then(res => {
    this.setState({icons_json : res.data.icons})
    // this.setState({types : res.data.})
    this.setState({showLoading : false})
    this.setSettings(res.data.settings);
  }).catch( e => {
    this.setState({showLoading : false})
    this.setState({showConnectionError : true})
  })

}


setSettings(settings){
  settings.forEach(setting => {
      switch (setting.slug) {
          case "essential-icon-types":
              this.setState({types : JSON.parse(setting.value)})
              this.getBtns();
              break;
          case "request-icon":
              document.querySelector(".request-btn").setAttribute("href" , setting.value);
              this.setState({icon_request : setting.value})
              break;
          case "piqo-link":
              this.setState({piqo_link : setting.value})
              break;
          default:
              break;
      }
  });
}

checkIconFound(icons){
  this.setState({found : !!icons.length})
}

componentDidMount(){
  this.getIcons();
}

hidePasteDialog () {
  this.setState({showPaste : false});
}

// testDrag(e){
//   console.log(this);
// }

getBtns(){
 

  return this.state.types.map(k => {
      return (
        <li className={"type-btn " + (this.state.c_type == k.slug ? "active" : "")} key={k.slug} data-type={k.slug} onClick={() => this.setType(k.slug)}>
            <span className="label light">{k.name}</span>
        </li>
      )
  })
}


  // [14]
  render() {
    return (
      <div style={this.bodyStyles}>
        <div className={"container " + (this.state.showLoading || this.state.showConnectionError ? "hide" : "")}>
          <div className="top_level">
            <div className="header">
              <div className="title">
                <svg width="73" height="21" viewBox="0 0 73 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M52.9913 0.185547H56.4357V16.0288H52.9913V0.185547ZM0 0.185624H3.44442V16.0289H0V0.185624ZM27.9195 1.48806C23.8905 1.48806 20.5992 4.8225 20.5992 8.9618C20.5992 13.1011 23.8337 16.378 27.9195 16.378C32.0052 16.378 35.2966 13.0436 35.2966 8.9618C35.2966 4.87998 31.9485 1.48806 27.9195 1.48806ZM27.9195 12.9286C25.7631 12.9286 24.004 11.1464 24.004 8.9618C24.004 6.77715 25.7631 4.93745 27.9195 4.93745C30.0759 4.93745 31.8918 6.71967 31.8918 8.9618C31.8918 11.2039 30.0759 12.9286 27.9195 12.9286ZM16.3998 6.71967C15.6621 5.62735 14.4137 4.93745 13.1085 4.93745C10.8954 4.93745 9.19296 6.77715 9.19296 9.01927C9.19296 11.2614 10.9521 13.0436 13.1085 13.0436C14.4704 13.0436 15.6621 12.3537 16.3998 11.2614L19.2372 13.1586C17.8185 15.2282 15.5486 16.4355 13.1085 16.4355C9.07948 16.4355 5.78817 13.1011 5.78817 8.9618C5.78817 4.8225 9.07948 1.48806 13.1085 1.48806C15.6054 1.48806 17.8752 2.69535 19.2372 4.76499L16.3998 6.71967ZM43.5249 1.71821C39.7796 1.71821 37.0556 4.36276 37.0556 8.04213V16.1483H40.4605V8.04213C40.4605 5.91499 42.1063 5.16761 43.5249 5.16761C44.9435 5.16761 46.5893 5.91499 46.5893 8.04213V16.1483H49.9942V8.04213C50.0509 4.36276 47.3269 1.71821 43.5249 1.71821ZM66.0535 11.1467L69.5715 2.12075V2.17824H72.8629L69.9691 9.537C69.189 11.3366 68.7399 12.4325 68.4954 13.0293C68.4198 13.2142 68.3634 13.3512 68.3232 13.4463C67.4721 15.286 66.6209 16.7807 65.7127 17.8731C64.8616 19.0229 63.8402 19.8277 62.8189 20.2876C61.911 20.6901 60.8326 20.8626 59.5843 20.8626H58.4494V17.4706H60.0949C61.5702 17.4131 62.3082 17.0682 63.1593 16.1484C63.4431 15.8034 63.67 15.4585 63.9537 14.9986L58.9601 2.12075H62.5352L66.0535 11.1467Z" fill="black"/>
                </svg>
              </div>
              <img src={close_icon} onClick={this.onCloseBtn} className="close_btn"/>
            </div>
            <div className="input-holder">
              <input type="text" id="search-inp" onChange={this.onInputChange} name="serach" id="serach" placeholder="Search something..."/>
            </div>
          </div>
          <div id="list-container">
              <div id="icon-container">
                {this.state.result_icons.map((k , i) => {
                  let icon = k.icon;
                  // icon = icon.replace('height="24"' , 'height="48"');
                  // icon = icon.replace('height="24px"' , 'height="48px"');
                  // icon = icon.replace('width="24"' , 'width="48"');
                  // icon = icon.replace('width="24px"' , 'width="48px"');
                  return (
                    <span key={i} data-name={k.name} className="icon" draggable={true} onDragStart={(e) => console.log(this)} onClick={() => this.getIcon(icon)} dangerouslySetInnerHTML={{ __html: icon }} />
                  )
                })}
              </div>
          </div>
          <ul className="types-btn">
              {this.getBtns()}
          </ul>
          <div className="copyright">
            <span>Made with 💜 by</span><span className="purple" onClick={() => {
              shell.openExternal(this.state.piqo_link);
            }}>Piqo design</span>
          </div>
          <div className={"not-found-container " + (this.state.found ? "" : "active")}>
              <div className="centerize">
                  <img src={not_found_img} className="not-found"alt=""/>
                  <p className="not-found-title">Nothing found</p>
              </div>
              <div className="request-btn centerize">
                <p onClick={() => {
                  shell.openExternal(this.state.icon_request);
                }}>
                  Request Icon
                </p>
              </div>
          </div>
          <PasteDialog show={this.state.showPaste} onHide={() => this.hidePasteDialog()} />
        </div>
        <div className={"loading " + (this.state.showLoading ? "active" : "")}>
            <p>Loading Icons...</p>
            <span className="cancel" onClick={this.onCloseBtn}>cancel</span>
        </div>
        <div className={"loading " + (this.state.showConnectionError ? "active" : "")}>
            <p>No Internet Connection!</p>
            <span className="cancel" onClick={this.onCloseBtn}>cancel</span>
        </div>
        <style>
          {style.toString()}
        </style>
      </div>
    );
  }
}

module.exports = Iconly;
