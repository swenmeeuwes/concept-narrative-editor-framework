export default interface Embeddable<T> {
    validateEmbed(child: T): boolean;
}