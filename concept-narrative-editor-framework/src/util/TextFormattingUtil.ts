class TextFormattingUtil {
    public static camelToSpaces(subject: string): string {
        return subject
            // Insert a space before all caps
            .replace(/([A-Z])/g, ' $1')
            // Uppercase the first character
            .replace(/^./, str => str.toUpperCase());
    }
}

export default TextFormattingUtil;