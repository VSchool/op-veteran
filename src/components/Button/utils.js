export function setStyle(style) {
    if (style === 'primary') {
        return {
            background: `#618572`,
            border: `border: 2px solid #618572`,
            fontColor: `#FFFFFF`,                borderRadius: `2px`
        }
    } else if (style === 'secondary') {
        return {
            background: `#FFFFFF`,
            border: `border: 2px solid #618572`,
            fontColor: `#618572`,
        }
    } 
}