export function setStyle(style) {
    if (style === 'primary') {
        return {
            background: `#545454`,
            color: `#FFFFFF`
        }
    } else if (style === 'secondary') {
        return {
            background: `#FFFFFF`,
            color: `#545454`
        }
    }
}