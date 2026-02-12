// blog.js

/**
 * Charge un composant HTML dans une div par son id
 * @param {string} id - ID de la div cible
 * @param {string} file - Nom du fichier HTML à charger depuis components/
 */
async function loadComponent(id, file) {
    const container = document.getElementById(id);
    try {
        const response = await fetch(`components/${file}`);
        if (!response.ok) throw new Error(`Impossible de charger ${file}`);
        container.innerHTML = await response.text();
    } catch (err) {
        console.error(err);
        container.innerHTML = `<p style="color:red;">Erreur : impossible de charger ${file}</p>`;
    }
}

// Charger header et footer
loadComponent('header', 'header.html');
loadComponent('footer', 'footer.html');

/**
 * Ajouter un comportement pour les boutons "Lire la suite"
 * Si tu ajoutes le contenu complet plus tard, tu peux le montrer/masquer ici
 */
function initReadMoreButtons() {
    const buttons = document.querySelectorAll('.read-more-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const postId = btn.getAttribute('data-post');
            const post = document.querySelector(`.blog-post[data-id="${postId}"]`);
            if (!post) return;
            const content = post.querySelector('.post-content');
            if (!content) return;

            // Toggle l'affichage
            if (content.style.display === 'block') {
                content.style.display = 'none';
                btn.innerHTML = `Lire la suite <i class="fas fa-arrow-right"></i>`;
            } else {
                content.style.display = 'block';
                btn.innerHTML = `Réduire <i class="fas fa-arrow-up"></i>`;
            }
        });
    });
}

/**
 * Initialise le blog après le chargement du DOM
 */
function initBlog() {
    // Au départ, masquer tout le contenu complet
    const contents = document.querySelectorAll('.post-content');
    contents.forEach(c => (c.style.display = 'none'));

    initReadMoreButtons();
}

// Initialisation après le chargement complet de la page
document.addEventListener('DOMContentLoaded', initBlog);

/**
 * Fonction utile si tu veux ouvrir un article complet dans une nouvelle page
 * Exemple futur : mettre un lien vers une page spécifique
 */
function openArticle(url) {
    window.open(url, '_blank', 'noopener,noreferrer');
}
