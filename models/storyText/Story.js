import { CarpenterModel, CarpenterModelRelationship, DataTypes } from "carpenter";

export default class Story extends CarpenterModel {
    static sequelizeDefinition = {
        story_id: { type: DataTypes.UUID, primaryKey: true, allowNull: false, },
        name: { type: DataTypes.STRING, allowNull: false },
        description:  { type: DataTypes.STRING, allowNull: false },
        story_order: { type: DataTypes.INTEGER, allowNull: false },
        series_id: { type: DataTypes.UUID, allowNull: true, }, 
    }

    static sequelizeConnections = [
        new CarpenterModelRelationship({ connectionType: "1M",
            parentModelName: "Series",
            required: true, childParentKey: 'series_id', childModelName: "Story" }),
    ];

    static seedDataCore = [
    ]
    static seedDataDemo = [
        { story_id: "de4114be-418c-4bb4-8943-bdd0f91708a0", name: 'Story 1', description: 'A tale of adventure.', story_order: 1, series_id: "985e5a46-8dff-49db-b389-ea4dd37f9ed7" },
        { story_id: "88378e40-b7ef-487e-a123-ef4819681771", name: 'Story 2', description: 'A mystery unfolds.',story_order: 2, series_id: "985e5a46-8dff-49db-b389-ea4dd37f9ed7" }
    ];
};