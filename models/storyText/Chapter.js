import { CarpenterModel, CarpenterModelRelationship, DataTypes } from "carpenter";

export default class Chapter extends CarpenterModel {
    static sequelizeDefinition = {
        chapter_id: { type: DataTypes.UUID, primaryKey: true, allowNull: false, },
        name: { type: DataTypes.STRING, allowNull: false },
        description:  { type: DataTypes.STRING, allowNull: false },
        chapter_order: { type: DataTypes.INTEGER, allowNull: false },
        story_id: { type: DataTypes.UUID, primaryKey: true, allowNull: false, },
    }

    static sequelizeConnections = [
        new CarpenterModelRelationship({ connectionType: "1M",
            parentModelName: "Story",
            required: true, childParentKey: 'story_id', childModelName: "Chapter" }),
    ];

    static seedDataCore = [
    ]
    static seedDataDemo = [        
      { chapter_id: "72641881-f60c-409e-b184-6bf8273d97fa", story_id: "de4114be-418c-4bb4-8943-bdd0f91708a0", name: 'Chapter 1', description: 'The beginning.', chapter_order: 1 },
      { chapter_id: "4b8c5996-8825-4eb7-b90c-656aeb524a4c", story_id: "de4114be-418c-4bb4-8943-bdd0f91708a0", name: 'Chapter 2', description: 'The journey continues.', chapter_order: 2 },
      { chapter_id: "c1f8b2d3-5e4f-4a6b-9c7d-8e9f0a1b2c3d", story_id: "88378e40-b7ef-487e-a123-ef4819681771", name: 'Chapter 1', description: 'A strange event.', chapter_order: 1 },

    ];
};
