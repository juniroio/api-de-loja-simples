module.exports = {
    type: "object",
    properties: {
        titulo: {type: "string"},
        texto: {type: "string"},
        produtoId: {type: "integer"}
    },
    required: ["titulo", "texto", "produtoId"],
    additionalProperties: false
}