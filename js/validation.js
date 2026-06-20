/**
 * Contact Form Validation & Message Composer Modal Linker
 * Using snake_case convention as per project standards.
 */
document.addEventListener('DOMContentLoaded', () => {
    const contact_form = document.getElementById('contactForm');
    const form_status = document.getElementById('formStatus');

    // Main Preview Modal elements
    const preview_modal = document.getElementById('previewModal');
    const preview_subject = document.getElementById('previewSubject');
    const preview_body = document.getElementById('previewBody');
    const close_preview = document.getElementById('closePreview');
    const cancel_send = document.getElementById('cancelSend');
    const confirm_send = document.getElementById('confirmSend');

    // Discard Confirmation Warning Modal elements
    const confirm_discard_modal = document.getElementById('confirmDiscardModal');
    const abort_discard = document.getElementById('abortDiscard');
    const approve_discard = document.getElementById('approveDiscard');

    if (!contact_form) return;

    // Form field elements
    const fields = {
        name: {
            input: document.getElementById('name'),
            error: document.getElementById('nameError'),
            validate: (val) => val.trim().length >= 2 ? '' : 'Name must be at least 2 characters.'
        },
        email: {
            input: document.getElementById('email'),
            error: document.getElementById('emailError'),
            validate: (val) => {
                const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return email_pattern.test(val) ? '' : 'Please enter a valid email address.';
            }
        },
        phone: {
            input: document.getElementById('phone'),
            error: document.getElementById('phoneError'),
            validate: (val) => {
                const phone_pattern = /^[0-9+()#\-\s]{7,20}$/;
                return phone_pattern.test(val) ? '' : 'Please enter a valid phone number (digits only, 7-20 chars).';
            }
        },
        message: {
            input: document.getElementById('message'),
            error: document.getElementById('messageError'),
            validate: (val) => val.trim().length >= 10 ? '' : 'Message must be at least 10 characters.'
        }
    };

    let composed_subject = '';
    let composed_body = '';

    // Live validation input event listeners
    Object.keys(fields).forEach((key) => {
        const field = fields[key];
        field.input.addEventListener('input', () => {
            const error_msg = field.validate(field.input.value);
            field.error.textContent = error_msg;
            if (error_msg) {
                field.input.classList.add('input-invalid');
            } else {
                field.input.classList.remove('input-invalid');
            }
        });
    });

    // Form submit intercept -> Opens Preview Modal
    contact_form.addEventListener('submit', (event) => {
        event.preventDefault();
        let is_valid = true;

        // Perform final check on all fields
        Object.keys(fields).forEach((key) => {
            const field = fields[key];
            const error_msg = field.validate(field.input.value);
            field.error.textContent = error_msg;
            if (error_msg) {
                field.input.classList.add('input-invalid');
                is_valid = false;
            } else {
                field.input.classList.remove('input-invalid');
            }
        });

        if (!is_valid) {
            form_status.textContent = 'Please correct the errors in the form before composing.';
            form_status.className = 'status-message error-box';
            form_status.style.display = 'block';
            return;
        }

        form_status.style.display = 'none';

        // Extract values
        const name_val = fields.name.input.value.trim();
        const email_val = fields.email.input.value.trim();
        const phone_val = fields.phone.input.value.trim();
        const msg_val = fields.message.input.value.trim();

        // Save composed content parameters globally
        composed_subject = `Portfolio Contact from ${name_val}`;
        composed_body = `Name: ${name_val}\nEmail: ${email_val}\nPhone: ${phone_val}\n\nMessage:\n${msg_val}`;

        // Populate and display the preview modal elements
        preview_subject.textContent = composed_subject;
        preview_body.textContent = composed_body;
        preview_modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Lock main scroll
    });

    // Functions to close the preview modal
    const close_modal_action = () => {
        preview_modal.style.display = 'none';
        confirm_discard_modal.style.display = 'none';
        document.body.style.overflow = ''; // Unlock main scroll
    };

    // Close preview trigger check via HTML warning modal
    const request_close_check = () => {
        confirm_discard_modal.style.display = 'flex';
    };

    // Abort discard modal
    abort_discard.addEventListener('click', () => {
        confirm_discard_modal.style.display = 'none';
    });

    // Approve discard modal
    approve_discard.addEventListener('click', () => {
        close_modal_action();
    });

    close_preview.addEventListener('click', request_close_check);
    cancel_send.addEventListener('click', request_close_check);

    // Confirm click opens mail client
    confirm_send.addEventListener('click', () => {
        const destination_email = 'bamigboyepelumi38@gmail.com';
        const mailto_url = `mailto:${destination_email}?subject=${encodeURIComponent(composed_subject)}&body=${encodeURIComponent(composed_body)}`;
        
        window.location.href = mailto_url;

        // Close preview and show success confirmation message
        close_modal_action();
        form_status.textContent = 'Opening your email client... Draft details successfully copied to message body.';
        form_status.className = 'status-message success';
        form_status.style.display = 'block';

        // Clear values
        contact_form.reset();
    });

    // Close modal if clicking overlay backgrounds
    preview_modal.addEventListener('click', (event) => {
        if (event.target === preview_modal) {
            request_close_check();
        }
    });

    confirm_discard_modal.addEventListener('click', (event) => {
        if (event.target === confirm_discard_modal) {
            confirm_discard_modal.style.display = 'none';
        }
    });
});
