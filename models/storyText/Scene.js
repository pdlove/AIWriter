import { CarpenterModel, CarpenterModelRelationship, DataTypes } from "carpenter";

export default class Scene extends CarpenterModel {
  static sequelizeDefinition = {
    scene_id: { type: DataTypes.UUID, primaryKey: true, allowNull: false, },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    scene_order: { type: DataTypes.INTEGER, allowNull: false },
    chapter_id: { type: DataTypes.UUID, allowNull: false, },
    status: { type: DataTypes.STRING, allowNull: false }, // planned, running, hold, complete, final
    starting_prompt: { type: DataTypes.TEXT, allowNull: true },
    narrative: { type: DataTypes.TEXT, allowNull: true },
    ending_state_summary: { type: DataTypes.TEXT, allowNull: true },
  }

  static sequelizeConnections = [
    new CarpenterModelRelationship({
      connectionType: "1M",
      parentModelName: "Chapter",
      required: true, childParentKey: 'chapter_id', childModelName: "Scene"
    }),
  ];

  static seedDataCore = [
  ]
  static seedDataDemo = [
    {
      scene_id: "0b8d0fe5-63ed-4868-a754-399ddbb0e461", chapter_id: "72641881-f60c-409e-b184-6bf8273d97fa", name: 'Scene 1', description: 'Opening scene.', scene_order: 1, status: 'planned', starting_prompt: 'Lex Luthor stands in his office overlooking Metropolis, contemplating the day ahead.', narrative: `# Opening Scene
The story begins with Lex Luthor in his office, contemplating the challenges ahead...
The morning sun cast long shadows across the marble floor of Lex Luthor's corner office. From his position behind the massive oak desk, he could see the entire expanse of Metropolis spread out below him like a chess board waiting for the next move.
*This is where our story truly begins,* he thought to himself, *where human ingenuity meets alien interference.*`  },
    {
      scene_id: "07432533-81db-4ab6-ae35-fc69d79e1846", chapter_id: "72641881-f60c-409e-b184-6bf8273d97fa", name: 'Scene 2', description: 'Conflict arises.', scene_order: 2, status: 'planned', starting_prompt: 'News breaks of an incident downtown that requires Superman\'s attention.', narrative: `# Conflict Arises
Tension builds as opposing forces come into play...
The emergency alert blazed across every screen in the city. A construction crane had malfunctioned downtown, threatening to collapse onto a crowded street. Within minutes, the familiar red and blue blur streaked across the sky.
Lex watched from his window, his jaw tightening. *Always the savior,* he mused. *But who saves us from the savior?*` },

    {
      scene_id: "d4f8c9ca-13e3-45f5-8e96-c61fc73ada2b", chapterid: "4b8c5996-8825-4eb7-b90c-656aeb524a4c", name: 'Scene 1', description: 'A twist.', scene_order: 1, status: 'planned', starting_prompt: 'Lois Lane discovers something unexpected about the recent incidents.', narrative: `# The Twist
Unexpected developments change everything...
Lois Lane's fingers flew across the keyboard as she cross-referenced the data from the past week's incidents. The pattern was subtle, almost invisible, but it was there. Someone was orchestrating these "accidents" - creating situations that would require Superman's intervention.
The question was: why?`
    },
    {
      scene_id: "08044a4a-5134-4af2-8bcf-b079e02f052b", chapter_id: "4b8c5996-8825-4eb7-b90c-656aeb524a4c", name: 'Scene 2', description: 'A revelation.', scene_order: 2, status: 'planned', starting_prompt: 'The truth about the recent events comes to light.', narrative: `# The Revelation
Truths are finally revealed...
In the depths of LexCorp's research facility, monitors displayed real-time analysis of Superman's responses to each crisis. Reaction times, flight patterns, energy signatures - all meticulously catalogued.
"Sir," his assistant approached cautiously, "the analysis is complete. We now have a comprehensive baseline of his capabilities."
Lex smiled. Knowledge was power, and power was the only currency that mattered in this game.`},
    {
      scene_id: "b29d7631-5119-4114-89ac-b7e1dd38e7cd", chapter_id: "c1f8b2d3-5e4f-4a6b-9c7d-8e9f0a1b2c3d", name: 'Scene 1', description: 'The clue.', scene_order: 1, status: 'planned', starting_prompt: 'A mysterious discovery sets the investigation in motion.', narrative: `# The Clue
A mysterious discovery sets the investigation in motion...
The package arrived at the Daily Planet with no return address, containing only a single photograph and a cryptic note: "Not everything is as it seems. The real threat comes from within."
Lois studied the image - it appeared to be taken from inside LexCorp's executive floor. But how? And more importantly, by whom?`}
  ];
};
