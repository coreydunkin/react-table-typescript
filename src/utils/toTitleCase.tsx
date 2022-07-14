export function toTitleCase(str: string): string {
    // insert a space before all caps
    return str.replace(/([A-Z])/g, ' $1')
    // uppercase the first character
    .replace(/^./, function(str){ return str.toUpperCase(); })
}