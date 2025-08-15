import { CarpenterModel, CarpenterModelRelationship, DataTypes } from "carpenter";

export default class Series extends CarpenterModel {
    
    static sequelizeDefinition = {
        series_id: { type: DataTypes.UUID, primaryKey: true, allowNull: false, },
        name: { type: DataTypes.STRING, allowNull: false },
        description:  { type: DataTypes.STRING, allowNull: false },
        story_order: { type: DataTypes.INTEGER, allowNull: false },
        organizationId: { type: DataTypes.UUID, allowNull: false, },
    }

    static sequelizeConnections = [
        new CarpenterModelRelationship({ connectionType: "1M",
            parentModelName: "Organization",
            required: true, childParentKey: 'organizationId', childModelName: "Series" }),
    ];

    static seedDataCore = [
    ]
    static seedDataDemo = [
        { series_id: "985e5a46-8dff-49db-b389-ea4dd37f9ed7", name: 'Lex and Super', description: 'A tale of adventure.', story_order: 1, organization_id: "00000000-0000-0000-0000-000000000000" },
    ];
};