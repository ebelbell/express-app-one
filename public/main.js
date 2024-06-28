// Listen for the form submission event
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const formDataObj = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/new-pokemon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataObj)
      });

      if (!response.ok) {
        throw new Error('Failed to create new Pokémon');
      }

      const result = await response.json();
      alert(result.message);
      form.reset();
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to create new Pokémon');
    }
  });
});