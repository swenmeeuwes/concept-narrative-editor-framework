interface Embeddable<T> {
    validateEmbed(child: T): boolean;
}

export default Embeddable;