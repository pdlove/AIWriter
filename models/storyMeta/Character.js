import { CarpenterModel, CarpenterModelRelationship, DataTypes } from "carpenter";


export default class Character extends CarpenterModel {
  static sequelizeDefinition = {
    character_id: { type: DataTypes.UUID, primaryKey: true, allowNull: false, },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    personality: { type: DataTypes.TEXT, allowNull: true },
    history: { type: DataTypes.TEXT, allowNull: true },
    goals: { type: DataTypes.TEXT, allowNull: true },
    scene_role: { type: DataTypes.STRING, allowNull: true }, // protagonist, antagonist, background, environment
    knowledge: { type: DataTypes.TEXT, allowNull: true },
    series_id: { type: DataTypes.UUID, allowNull: true }, // For future use.
  }

  static sequelizeConnections = [
    new CarpenterModelRelationship({
      connectionType: "1M",
      parentModelName: "Series",
      required: true, childParentKey: 'series_id', childModelName: "Character"
    }),
  ];

  static seedDataCore = [
  ]
  static seedDataDemo = [
    {
      character_id: "95fba376-ee7f-4956-bdf8-1cd799571ecb",
      name: 'Lex Luthor',
      description: 'Brilliant businessman and scientist',
      personality: 'Intelligent, ambitious, methodical, sometimes ruthless. Believes in human potential and self-determination.',
      history: 'Built LexCorp from the ground up. Has a complex relationship with Superman, viewing him as both a threat and an opportunity.',
      goals: 'Advance human technology and potential, protect Earth from alien threats, maintain control over Metropolis.',
      scene_role: 'protagonist',
      knowledge: 'Knows Superman\'s secret identity, has extensive resources and technology, understands the political landscape of Metropolis.',
      series_id: "985e5a46-8dff-49db-b389-ea4dd37f9ed7"
    }, {
      character_id: "13e536a1-b8b1-4daf-a745-fba5d54b61c1",
      name: 'Superman',
      description: 'The Man of Steel, alien superhero',
      personality: 'Honorable, compassionate, strong-willed, sometimes naive about human nature.',
      history: 'Last son of Krypton, raised by the Kents in Smallville. Protects Earth as Superman.',
      goals: 'Protect Earth and its people, maintain peace, help those in need.',
      scene_role: 'antagonist',
      knowledge: 'Has superhuman abilities, knows Lex Luthor\'s schemes, but doesn\'t know Lex knows his secret identity.',
      series_id: "985e5a46-8dff-49db-b389-ea4dd37f9ed7"
    }, {
      character_id: "0be69115-9ed5-4d0d-a445-3f72d9a1608d",
      name: 'Lois Lane',
      description: 'Investigative journalist at the Daily Planet',
      personality: 'Determined, brave, curious, professional. Willing to risk everything for a story.',
      history: 'Award-winning reporter who often gets into dangerous situations while investigating stories.',
      goals: 'Uncover the truth, write compelling stories, maintain journalistic integrity.',
      scene_role: 'background',
      knowledge: 'Works with Clark Kent, has suspicions about Superman\'s identity, knows Lex Luthor is powerful but doesn\'t know the full extent of his schemes.',
      series_id: "985e5a46-8dff-49db-b389-ea4dd37f9ed7"
    }
  ];
};
