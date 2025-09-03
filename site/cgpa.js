function calu(){
    let em = document.getElementById("EM").value 
    let bee = document.getElementById("BEE").value 
    let ep= document.getElementById("EP").value 
    let pps  = document.getElementById("PPS").value 
    let com = document.getElementById("COM").value 
    let lan = document.getElementById("LAN").value 
    let cp = document.getElementById("CP").value 
    let cag = document.getElementById("CAG").value 
    let bel = document.getElementById("BEL").value 
    let phl = document.getElementById("PHL").value 
    let deca = document.getElementById("DECA").value 
    
    const points = {
    "A++" : 10,
    "A+": 9.0,
    "A": 8.5,
    "B+": 8.0,
    "B": 7.5,
    "C+": 7.0,
    "C": 6.5,
    "D+": 6.0,
    "D": 5.5,
    "E+": 5.0,
    "E": 4.0,
    "F": 0
}
const grade = {
    "em" : 4,
    "ep" : 4,
    "pps" : 2,
    "com" : 2,
    "bee" : 2,
    "lan" : 1,
    "cp" : 1.5,
    "cag" : 1.5,
    "bel" : 1,
    "phl" : 1,
    "deca" : 0.5
}

let cgpa = (points[em]*grade['em']+points[ep]*grade['ep']+points[pps]*grade['pps']+points[bee]*grade['bee']+points[com]*grade['com']+points[lan]*grade['lan']+points[bel]*grade['bel']+points[cag]*grade['cag']+points[cp]*grade['cp']+points[phl]*grade['phl']+points[deca]*grade['deca'])/(grade['em']+grade['ep']+grade['pps']+grade['bee']+grade['com']+grade['lan']+grade['bel']+grade['cag']+grade['cp']+grade['phl']+grade['deca'])
if (cgpa === null) {
        result.textContent = 'Please select grades first.';
        return;
    }
    cgpaValue.textContent = cgpa.toFixed(2);
    blur.style.display = 'flex';
    blur.setAttribute('aria-hidden','false');
}

const btn = document.getElementById("btn");
if (btn) btn.addEventListener('click', calu);

const blur = document.getElementById('blur');
const cgpaValue = document.getElementById('cgpaValue');
const closeBtn = document.getElementById('closeBtn');
const closeBtn2 = document.getElementById('closeBtn2');
const copyBtn = document.getElementById('copyBtn');
const result = document.getElementById('result');

function closeModal() {
    if (!blur) return;
    blur.style.display = 'none';
    blur.setAttribute('aria-hidden','true');
}

if (closeBtn) closeBtn.addEventListener('click', closeModal);
if (closeBtn2) closeBtn2.addEventListener('click', closeModal);

if (blur) {
    blur.addEventListener('click', (e) => {
        if (e.target === blur) closeModal();
    });
}

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

if (copyBtn) {
    copyBtn.addEventListener('click', () => {
        const text = cgpaValue ? cgpaValue.textContent : '';
        if (!text) return;
        navigator.clipboard?.writeText(text).then(() => {
            result.textContent = 'CGPA copied to clipboard';
            setTimeout(() => result.textContent = '', 2000);
        }).catch(() => {
            result.textContent = 'Unable to copy';
            setTimeout(() => result.textContent = '', 2000);
        })
    });
}

/* Live preview: compute CGPA without opening modal and update #estCGPA */
const estEl = document.getElementById('estCGPA');
function computePreview(){
    const ids = ["EM","EP","PPS","BEE","COM","LAN","CP","CAG","BEL","PHL","DECA"];
    const points = {"A++":10,"A+":9.0,"A":8.5,"B+":8.0,"B":7.5,"C+":7.0,"C":6.5,"D+":6.0,"D":5.5,"E+":5.0,"E":4.0,"F":0};
    const grade = {"em":4,"ep":4,"pps":2,"com":2,"bee":2,"lan":1,"cp":1.5,"cag":1.5,"bel":1,"phl":1,"deca":0.5};
    let sum=0, wsum=0;
    ids.forEach(id=>{
        const el = document.getElementById(id);
        if (!el) return;
        const val = el.value;
        const key = id.toLowerCase();
        const weight = grade[key] ?? 0;
        const pt = points[val] ?? 0;
        sum += pt * weight;
        wsum += weight;
    })
    if (!wsum){ if (estEl) estEl.textContent = '—'; return }
    const cgpa = sum/wsum;
    if (estEl) estEl.textContent = cgpa ? cgpa.toFixed(2) : '—';
}

// Attach change listeners to all selects
['EM','EP','PPS','BEE','COM','LAN','CP','CAG','BEL','PHL','DECA'].forEach(id=>{
    const el = document.getElementById(id);
    if (el) el.addEventListener('change', computePreview);
});

// initial preview
computePreview();