export function setStyle(style) {
  if (style === 'primary') {
    return {
      background: `#16a085`,
      border: `none`,
      fontColor: `#FFFFFF`,
      hoverBackground: `#6C937E`,
      activeBackground: `#567665`,
      activeBorder: `2px solid #70C297`,
    }
  } else if (style === 'secondary') {
    return {
      background: `#FFFFFF`,
      border: `2px solid #16a085`,
      borderRadius: `50px`,
      fontColor: `#16a085`,
      hoverBackground: `#F7F7F7`,
      activeBackground: `#F7F7F7`,
      activeBorder: `2px solid #70C297`,
    }
  } else if (style === 'text') {
    return {
      background: `none`,
      border: `none`,
      fontColor: `#618572`,
      boxShadow: `none`,
      activeBorder: `2px solid #70C297`,
    }
  } else if (style === 'google') {
    return {
      background: `#FFFFFF`,
      border: `2px solid #16a085`,
      fontColor: `#7A9E8B`,
      hoverBackground: `#F7F7F7`,
      activeBackground: `#F7F7F7`,
      activeBorder: `2px solid #70C297`,
    }
  }
}
