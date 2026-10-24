
import { useState } from 'react'
import './App.css'

const initialGroups = [
  { id: 1, name: 'Primary School', students: 180, arrival: '08:00 AM', zone: 'Zone A' },
  { id: 2, name: 'Middle School', students: 240, arrival: '08:10 AM', zone: 'Zone B' },
  { id: 3, name: 'High School', students: 320, arrival: '08:20 AM', zone: 'Zone C' },
  { id: 4, name: 'Senior Secondary', students: 160, arrival: '08:30 AM', zone: 'Zone A' },
]

const initialZones = [
  { name: 'Zone A', capacity: 120, assigned: 95 },
  { name: 'Zone B', capacity: 100, assigned: 78 },
  { name: 'Zone C', capacity: 90, assigned: 86 },
]

function App() {
  const [activeTab, setActiveTab] = useState('Overview')
  const [groups, setGroups] = useState(initialGroups)
  const [running, setRunning] = useState(false)
  const [plan, setPlan] = useState('Balanced Plan')

  const totalStudents = groups.reduce((sum, group) => sum + group.students, 0)

  const runPlanning = () => {
    setRunning(true)
    setTimeout(() => {
      setPlan('AI Recommended Plan')
      setRunning(false)
    }, 1000)
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">G</div>
          <div>
            <h2>GateFlow<span>AI</span></h2>
            <p>School Traffic Intelligence</p>
          </div>
        </div>

        <p className="nav-label">WORKSPACE</p>
        {['Overview', 'Student Groups', 'Pickup Zones', 'AI Planner', 'Simulation'].map((item) => (
          <button
            key={item}
            className={`nav-item ${activeTab === item ? 'active' : ''}`}
            onClick={() => setActiveTab(item)}
          >
            <span className="nav-dot">{['Overview', 'Student Groups', 'Pickup Zones', 'AI Planner', 'Simulation'].indexOf(item) + 1}</span>
            {item}
          </button>
        ))}

        <div className="sidebar-bottom">
          <div className="school-avatar">SC</div>
          <div>
            <strong>Demo School</strong>
            <p>Administrator workspace</p>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <p className="breadcrumb">Workspace / {activeTab}</p>
            <h1>{activeTab}</h1>
          </div>
          <div className="topbar-right">
            <span className="demo-badge">DEMO DATA</span>
            <div className="profile">AD</div>
          </div>
        </header>

        {activeTab === 'Overview' && (
          <>
            <section className="welcome-row">
              <div>
                <p className="eyebrow">SMART SCHOOL MOBILITY</p>
                <h2>Make every school arrival smoother.</h2>
                <p className="muted">Plan staggered arrivals, balance pickup zones, and compare traffic scenarios before implementation.</p>
              </div>
              <button className="primary-button" onClick={() => setActiveTab('AI Planner')}>
                ✦ Open AI Planner
              </button>
            </section>

            <section className="stats-grid">
              <StatCard label="Students in plan" value={totalStudents.toLocaleString()} detail="Across 4 student groups" icon="ST" />
              <StatCard label="Pickup zones" value="3" detail="One school gate" icon="PZ" />
              <StatCard label="Peak window" value="8:00–8:30" detail="Morning arrival · demo" icon="TM" />
              <StatCard label="Plan status" value="Draft" detail="Awaiting simulation" icon="AI" />
            </section>

            <section className="content-grid">
              <div className="panel groups-panel">
                <div className="panel-heading">
                  <div>
                    <h3>Student arrival schedule</h3>
                    <p>Illustrative schedule for the morning peak</p>
                  </div>
                  <button className="text-button" onClick={() => setActiveTab('Student Groups')}>View groups →</button>
                </div>
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr><th>GROUP</th><th>STUDENTS</th><th>ARRIVAL</th><th>PICKUP ZONE</th></tr>
                    </thead>
                    <tbody>
                      {groups.map((group) => (
                        <tr key={group.id}>
                          <td><strong>{group.name}</strong></td>
                          <td>{group.students}</td>
                          <td>{group.arrival}</td>
                          <td><span className="zone-tag">{group.zone}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="panel zones-panel">
                <div className="panel-heading">
                  <div>
                    <h3>Pickup-zone capacity</h3>
                    <p>Illustrative assigned capacity</p>
                  </div>
                </div>
                {initialZones.map((zone) => {
                  const percent = Math.round(zone.assigned / zone.capacity * 100)
                  return (
                    <div className="capacity-item" key={zone.name}>
                      <div className="capacity-label">
                        <strong>{zone.name}</strong>
                        <span>{zone.assigned}/{zone.capacity}</span>
                      </div>
                      <div className="progress-track">
                        <div className={`progress-fill ${percent >= 90 ? 'warning' : ''}`} style={{ width: `${percent}%` }} />
                      </div>
                      <p>{percent}% assigned capacity</p>
                    </div>
                  )
                })}
                <div className="capacity-note">Zone C is close to its configured capacity. Review assignments before approving a plan.</div>
              </div>
            </section>

            <section className="panel planner-banner">
              <div className="planner-symbol">✦</div>
              <div className="planner-copy">
                <p className="eyebrow">DECISION SUPPORT</p>
                <h3>Find a better arrival plan</h3>
                <p>Compare schedule options against zone capacity and simulated congestion. Recommendations below are demo-only until connected to the planning engine.</p>
              </div>
              <button className="primary-button" onClick={() => setActiveTab('AI Planner')}>Explore plans →</button>
            </section>
          </>
        )}

        {activeTab === 'Student Groups' && (
          <section className="panel page-panel">
            <div className="panel-heading">
              <div><h3>Student groups</h3><p>Manage the illustrative arrival demand.</p></div>
            </div>
            {groups.map((group) => (
              <div className="group-editor" key={group.id}>
                <div><strong>{group.name}</strong><p>{group.arrival} · {group.zone}</p></div>
                <label>Students
                  <input type="number" min="0" value={group.students} onChange={(event) => setGroups(groups.map((g) => g.id === group.id ? { ...g, students: Math.max(0, Number(event.target.value)) } : g))} />
                </label>
              </div>
            ))}
            <p className="helper-text">Changes update the overview totals. These are fictional demo values, not real student records.</p>
          </section>
        )}

        {activeTab === 'Pickup Zones' && (
          <section className="panel page-panel">
            <div className="panel-heading"><div><h3>Pickup zones</h3><p>Review configured capacity before assigning groups.</p></div></div>
            {initialZones.map((zone) => (
              <div className="zone-row" key={zone.name}>
                <div><strong>{zone.name}</strong><p>Configured capacity: {zone.capacity} vehicles (demo)</p></div>
                <span className={`status-pill ${zone.assigned / zone.capacity >= 0.9 ? 'status-warning' : ''}`}>{Math.round(zone.assigned / zone.capacity * 100)}% assigned</span>
              </div>
            ))}
            <p className="helper-text">Capacity values are illustrative. Real deployment needs measured bay capacity and stopping-time data.</p>
          </section>
        )}

        {activeTab === 'AI Planner' && (
          <section className="panel page-panel">
            <p className="eyebrow">PLANNING ENGINE</p>
            <h2>Generate a candidate plan</h2>
            <p className="muted">The current button demonstrates the interface only. We will connect it to a real constraint-aware optimization engine in the next stage.</p>
            <div className="plan-options">
              {['Minimal Change', 'Balanced Plan', 'Congestion Focused'].map((option) => (
                <button key={option} className={`plan-option ${plan === option ? 'selected' : ''}`} onClick={() => setPlan(option)}>
                  <strong>{option}</strong>
                  <span>{option === 'Minimal Change' ? 'Keep close to the current schedule' : option === 'Balanced Plan' ? 'Balance schedule and zone capacity' : 'Prioritize reducing peak congestion'}</span>
                </button>
              ))}
            </div>
            <button className="primary-button" disabled={running} onClick={runPlanning}>{running ? 'Preparing demo…' : '✦ Generate candidate plan'}</button>
            {plan === 'AI Recommended Plan' && !running && <div className="result-note"><strong>Demo interaction complete.</strong><p>No AI optimization has run yet. Next, we will implement feasibility checks and a measurable objective function.</p></div>}
          </section>
        )}

        {activeTab === 'Simulation' && (
          <section className="panel page-panel">
            <p className="eyebrow">TRAFFIC DIGITAL TWIN</p>
            <h2>Simulation workspace</h2>
            <p className="muted">Compare the baseline against candidate schedules after the simulation engine is connected.</p>
            <div className="simulation-placeholder">
              <div className="road-line" />
              <div className="road-car car-one">CAR</div>
              <div className="road-car car-two">CAR</div>
              <div className="road-car car-three">CAR</div>
              <p>Simulation not run</p>
              <span>Traffic metrics will appear here when the model is integrated.</span>
            </div>
            <div className="helper-text">All current dashboard numbers are illustrative. Do not present them as measured or simulated results.</div>
          </section>
        )}

        <footer>GateFlow AI · School traffic planning prototype <span>Prototype · Synthetic data</span></footer>
      </main>
    </div>
  )
}

function StatCard({ label, value, detail, icon }) {
  return (
    <div className="stat-card">
      <div className="stat-top"><span>{label}</span><div className="stat-icon">{icon}</div></div>
      <h2>{value}</h2>
      <p>{detail}</p>
    </div>
  )
}

export default App
