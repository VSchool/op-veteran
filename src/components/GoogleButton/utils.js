export function setStyle(style) {
  if (style === 'primary') {
    return {
      background: `#7A9E8B`,
      border: `2px solid #618572`,
      fontColor: `#FFFFFF`,
      hoverBackground: `#6C937E`,
      activeBackground: `#567665`,
      activeBorder: `2px solid #70C297`,
    }
  } else if (style === 'secondary') {
    return {
      background: `#FFFFFF`,
      border: `2px solid #7A9E8B`,
      fontColor: `#7A9E8B`,
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
  }
}
