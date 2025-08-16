import { h, render } from '/vendor/preact/preact.mjs';
import { useState } from '/vendor/preact/hooks.mjs';

export default function CharacterCard({ character, generatePrompt }) {
  const [editing, setEditing] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [editData, setEditData] = useState(character);

  const handleEditClick = () => setEditing(true);
  const handleCancelEdit = () => {
    setEditData(character);
    setEditing(false);
  };
  const handleSaveEdit = () => {
    // TODO: Save logic (call parent or API)
    setEditing(false);
  };
  const handleExpand = () => setExpanded(e => !e);
  const handlePromptPreview = () => setShowPrompt(p => !p);

  const handleChange = e => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: 8,
      padding: 16,
      margin: 8,
      boxShadow: expanded ? '0 0 16px #aaa' : '0 2px 8px #eee',
      position: 'relative',
      background: '#fff',
      width: expanded ? '90vw' : 350,
      minHeight: expanded ? '80vh' : 200,
      zIndex: expanded ? 1000 : 1,
      transition: 'all 0.2s',
    }}>
      {/* Pencil icon for edit */}
      <span
        style={{ position: 'absolute', top: 12, right: 44, cursor: 'pointer', opacity: 0.7 }}
        title="Edit"
        onClick={handleEditClick}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.7 2.29a1 1 0 0 1 1.42 0l1.59 1.59a1 1 0 0 1 0 1.42l-9.3 9.3-3.3.71.71-3.3 9.3-9.3zM3 17h14v2H3v-2z" fill="#555"/>
        </svg>
      </span>
      {/* Expand/contract button */}
      <button
        style={{ position: 'absolute', top: 12, right: 12, cursor: 'pointer', opacity: 0.7 }}
        onClick={handleExpand}
        title={expanded ? 'Contract' : 'Expand'}
      >
        {expanded ? '🗕' : '🗖'}
      </button>
      {/* Prompt preview button */}
      <button
        style={{ position: 'absolute', bottom: 12, right: 12, cursor: 'pointer', opacity: 0.7 }}
        onClick={handlePromptPreview}
        title="Prompt Preview"
      >
        💬
      </button>
      {/* Card content */}
      {editing ? (
        <div>
          <input name="name" value={editData.name} onChange={handleChange} placeholder="Name" style={{ width: '100%', marginBottom: 8 }} />
          <textarea name="description" value={editData.description} onChange={handleChange} placeholder="Description" style={{ width: '100%', marginBottom: 8 }} />
          <textarea name="personality" value={editData.personality} onChange={handleChange} placeholder="Personality" style={{ width: '100%', marginBottom: 8 }} />
          <textarea name="history" value={editData.history} onChange={handleChange} placeholder="History" style={{ width: '100%', marginBottom: 8 }} />
          <textarea name="goals" value={editData.goals} onChange={handleChange} placeholder="Goals" style={{ width: '100%', marginBottom: 8 }} />
          <input name="scene_role" value={editData.scene_role} onChange={handleChange} placeholder="Scene Role" style={{ width: '100%', marginBottom: 8 }} />
          <textarea name="knowledge" value={editData.knowledge} onChange={handleChange} placeholder="Knowledge" style={{ width: '100%', marginBottom: 8 }} />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <button onClick={handleSaveEdit}>Save</button>
            <button onClick={handleCancelEdit}>Cancel</button>
          </div>
        </div>
      ) : (
        <div>
          <h2 style={{ margin: '0 0 8px 0' }}>{character.name}</h2>
          <div><b>Role:</b> {character.scene_role}</div>
          <div><b>Description:</b> {character.description}</div>
          <div><b>Personality:</b> {character.personality}</div>
          <div><b>History:</b> {character.history}</div>
          <div><b>Goals:</b> {character.goals}</div>
          <div><b>Knowledge:</b> {character.knowledge}</div>
        </div>
      )}
      {/* Prompt preview modal/section */}
      {showPrompt && (
        <div style={{
          position: expanded ? 'absolute' : 'fixed',
          left: expanded ? 20 : '50%',
          top: expanded ? 20 : '50%',
          transform: expanded ? 'none' : 'translate(-50%,-50%)',
          background: '#f9f9f9',
          border: '1px solid #aaa',
          borderRadius: 8,
          padding: 16,
          zIndex: 2000,
          width: expanded ? 'calc(100% - 40px)' : 400,
          maxHeight: 400,
          overflow: 'auto',
          boxShadow: '0 4px 24px #aaa',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <b>Prompt Preview</b>
            <button onClick={handlePromptPreview} style={{ fontSize: 18, background: 'none', border: 'none', cursor: 'pointer' }}>✕</button>
          </div>
          <pre style={{ whiteSpace: 'pre-wrap', marginTop: 8 }}>{generatePrompt(character)}</pre>
        </div>
      )}
    </div>
  );
}