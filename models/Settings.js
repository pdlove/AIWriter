import { CarpenterModel, CarpenterModelRelationship, DataTypes } from "carpenter";

export default class Settings extends CarpenterModel {
    static sequelizeDefinition = {
        setting_id: { type: DataTypes.UUID, primaryKey: true, allowNull: false, },
        name: { type: DataTypes.STRING, allowNull: false },
        description:  { type: DataTypes.STRING, allowNull: false },
        value: { type: DataTypes.STRING, allowNull: true },
    }
    static seedDataCore = [
        { setting_id: "95f0b8a2-1c25-4a5d-a23f-4896106c93df", name: "ai_type", description: "Type of AI engine to use. Currently only ollama is supported", value: "ollama"}, 
        { setting_id: "d11f5a17-3b5b-4a6f-96ec-77616e730cea", name: "ai_endpoint", description: "Endpoint for moder", value: "http://localhost:11434/api/ollama" },
        { setting_id: "6a7b8c9d-1e2f-3g4h-5i6j-7k8l9m0n1o2p", name: "ai_model", description: "Model to use for story assistance", value: "llama3" },        
        { setting_id: "9b2b7ff1-bbc2-4b66-a95c-939b9b3f33aa", name: "security_model", description: "none, org", value: "none" },
    ]
    static seedDataDemo = [        
    ];
};
6