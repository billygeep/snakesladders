var style;

// this is a wrapped function
(function () {

  // the variables declared here will not be scoped anywhere and will only be accessible in this wrapped function
  var defaultColor = "#FFFFFF";
  var highlightColor = "#FEFFD5";

  style = {
    titlestyle: { font: 'Geek-a-byte-2', fontSize: 32, fill: 'white', align: 'center', boundsAlignH: "center", boundsAlignV: "middle" },

    navitem: {
      base: {
        font: '30pt Geek-a-byte-2',
        align: 'left',
        srokeThickness: 4
      },
      default: {
        fill: defaultColor,
        stroke: 'rgba(0,0,0,0)'
      },
      inverse: {
        fill: 'black',
        stroke: 'black'
      },
      hover: {
        fill: highlightColor,
        stroke: 'rgba(200,200,200,0.5)'
      }
    }
  };

  for (var key in style.navitem) {
    if (key !== "base") {
      Object.assign(style.navitem[key], style.navitem.base)
    }
  }

})();