import React from 'react';

function Mixer(props) {

    return (
        <div id='mixer'>
            <ul id='initial_playlists'>
                {props.beta_playlist.map(playlist =>
                    <li className='beta-playlist' style={{backgroundColor: props.colors[1], borderColor: props.colors[3], color: props.colors[2]}}>
                        <input type="checkbox" onClick={() => {
                            if (playlist[0][11] === 'false') {
                                playlist[0][11] = 'true';
                            } else if (playlist[0][11] === 'true') {
                                playlist[0][11] = 'false';
                            }
                        }}/>
                        <span>{playlist[0][9]}</span>
                        <div>
                            <span className="material-symbols-outlined" style={{textShadow: 'none'}}>music_note</span>
                            <p>{playlist.length}</p>
                        </div>
                        <div>
                            <span className="material-symbols-outlined" style={{textShadow: 'none', marginRight: '3px'}}>schedule</span>
                            <p>{playlist[0][10]}</p>
                        </div>
                    </li>
                )}
                <li className='clear' style={(props.beta_playlist.length <= 3 ? {visibility:'hidden'}
                    : {display:'block'})} onClick={() => {
                        props.set_beta([]);
                }}>
                    <button>CLEAR</button>
                </li>
            </ul>
            <form id='playlist_options' action="" style={{maxWidth: '450px', justifySelf: 'center'}}>
                <span id='mb-1' className="material-symbols-outlined" onClick={ () => {
                    if (props.beta_playlist.length > 0 && props.staged_finals.length === 0 &&
                        props.beta_playlist.filter(playlist => playlist[0][11] === 'true').length === 1) {
                        props.beta_playlist.filter(playlist => playlist[0][11] === 'true').map(playlist =>
                            props.set_staged_finals(prev => [...prev, playlist])
                        )
                    }
                }} style={{color: props.colors[2]}}>arrow_downward</span>
                <span id='mb-2' className="material-symbols-outlined" onClick={ () => {
                    if (props.beta_playlist.length > 0 && props.staged_finals.length === 0 &&
                        props.beta_playlist.filter(playlist => playlist[0][11] === 'true').length > 1) {

                        const unifiedPlaylist = [];

                        props.beta_playlist.filter(playlist => playlist[0][11] === 'true').map(playlist => {
                            playlist.map(song => {
                                unifiedPlaylist.push(song)
                            })
                        })

                        const droppedPlaylistName = unifiedPlaylist.map((prev) => {
                                const left = prev.slice(0, 8)
                                const newPlaylistTitle = ['1', "'X' Playlist", 999, 'true']
                                return [...left, ...newPlaylistTitle];
                            }
                        )

                        props.set_staged_finals(prev => [...prev, droppedPlaylistName])
                    }
                }} style={{color: props.colors[2]}}>join_full</span>
                <span id='mb-3' className="material-symbols-outlined" onClick={ () => {
                    if (props.beta_playlist.length > 0 && props.staged_finals.length === 0 &&
                        props.beta_playlist.filter(playlist => playlist[0][11] === 'true').length > 1) {

                        const unifiedPlaylist = [];

                        props.beta_playlist.filter(playlist => playlist[0][11] === 'true').map(playlist => {
                            playlist.map(song => {
                                unifiedPlaylist.push(song)
                            })
                        })

                        const droppedPlaylistName = unifiedPlaylist.map((prev) => {
                                const left = prev.slice(0, 8)
                                const newPlaylistTitle = ['1', "'Y' Playlist", 999, 'true']
                                return [...left, ...newPlaylistTitle];
                            }
                        )

                        const intersectedTracks = droppedPlaylistName.filter(
                            (v1, i1, a) => a.some((v2, i2) => v1[0] === v2[0] && v1[1] === v2[1] && i1 !== i2)
                        );

                        const stringedIntersections = intersectedTracks.map(track => track.join(' ^ '))

                        const intersectedSet = new Set(stringedIntersections);

                        const intersectedPlaylist = [];

                        if (intersectedTracks.length > 0) {
                            intersectedSet.forEach(track => intersectedPlaylist.push(track.split(' ^ ')));

                            props.set_staged_finals(prev => [...prev, intersectedPlaylist])
                        }
                    }
                }} style={{color: props.colors[2]}}>join_inner</span>
            </form>
            <ul id='committed_playlists' style={props.staged_finals.length > 0 ?
            {display: 'grid', gridAutoRows: '100%', height: '95%', width: '95%', border: 'var(--final-border)',
            boxShadow: 'var(--final-box-shadow)'} : {display: 'grid', gridAutoRows: '100%', height: '95%', width: '95%',
                    maxWidth: '400px', maxHeight: '200px', border: '2px solid darkgray', boxShadow: '0 0 8px darkgray'}}>
                {props.staged_finals.map(playlist =>
                    <li id='transition' style={{backgroundColor: props.colors[0], gridTemplateColumns: '1fr',
                    justifySelf: 'center', textAlign: 'center', fontSize: '1.5rem', letterSpacing: '1px'}}>
                        <section className='transition-section'>
                            <div className='transition-card'>
                                <div className='final-card-image-div' style={{alignSelf: 'center', justifySelf: 'center'}}>
                                    <img className='final-card-images' src={playlist[props.index][2]} alt=""/>
                                </div>
                            </div>
                        </section>
                        <section><span style={{color: props.colors[6]}}>{playlist[0][9]}</span></section>
                    </li>
                )}
                <li className='clear' style={(props.staged_finals.length === 0 ? {visibility:'hidden'}
                    : {display:'block', height: '65px'})} onClick={() => {
                        props.set_staged_finals([]);
                }}>
                    <button>REMOVE</button>
                </li>
            </ul>
        </div>
    )
}

export default Mixer;
