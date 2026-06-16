import React from "react";

export default function App() {
  const teams = [
    { owner: "David Hickey", team: "France", points: 0, next: "Jun 16, 3:00 PM ET vs Senegal" },
    { owner: "David Hickey", team: "Japan", points: 1, next: "Jun 20 vs Tunisia" },
    { owner: "Vince Barbati", team: "England", points: 0, next: "Jun 17, 4:00 PM ET vs Croatia" },
    { owner: "Vince Barbati", team: "Côte d'Ivoire", points: 3, next: "Jun 20 vs Germany" }
  ];

  return (
    <div className="app-shell">
      <div className="container">
        <header className="hero">
          <h1>Fantasy World Cup Tracker</h1>
          <p>
            Public deployment test for your Vite + Vercel setup.
            Once this is live, we can drop your full tracker into this structure.
          </p>
        </header>

        <section className="section">
          <h2>Deployment Check</h2>
          <div className="card-grid">
            {teams.map((item, index) => (
              <div className="card" key={`${item.owner}-${item.team}-${index}`}>
                <div className="card-top">
                  <div>
                    <div className="label">Owner</div>
                    <div className="value">{item.owner}</div>
                  </div>
                  <div className="pill">PTS {item.points}</div>
                </div>

                <div className="team-name">{item.team}</div>

                <div className="next-match-label">Next match</div>
                <div className="next-match">{item.next}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
