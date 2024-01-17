const Validator = {
    number: (x, min = -Infinity, max = Infinity, fallback = 0) => {
        return (isNaN(x) || x < min || x > max) ? fallback : +x;
    },
    /**
     * @param {*} x 
     * @param {[number, number, number]} fallback 
     * @returns {[number, number, number]}
     */
    rgb: (x, fallback = [0, 0, 0]) => {
        if (!(x instanceof Array) || x.length !== 3) return fallback;

        let mapped = x.map(v => Validator.number(v, 0, 255, null));
        return mapped.includes(null) ? fallback : mapped;
    },
    /**
     * @param {*} x 
     * @param {[number, number, number, number]} fallback 
     * @returns {[number, number, number, number]}
     */
    rgba: (x, fallback = [0, 0, 0, 1]) => {
        if (!(x instanceof Array) || x.length !== 4) return fallback;

        let rgb = x.slice(0, 3).map(v => Validator.number(v, 0, 255, null));
        let a = Validator.number(x[3], 0, 1, null);

        return (rgb.includes(null) || a === null) ? fallback : x;
    },
};

export default Validator;