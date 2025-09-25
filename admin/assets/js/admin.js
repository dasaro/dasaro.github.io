class AdminPanel {
    constructor() {
        this.data = null;
        this.locales = {};
        this.currentLang = 'en';
        this.unsavedChanges = false;
        this.init();
    }

    async init() {
        try {
            await this.checkLocalhost();
            await this.loadData();
            await this.loadLocales();
            this.initTabs();
            this.initForms();
            this.initEventListeners();
            this.populateAllForms();
            this.showStatus('Admin panel loaded successfully', 'success');
        } catch (error) {
            console.error('Failed to initialize admin panel:', error);
            this.showStatus('Failed to initialize admin panel: ' + error.message, 'error');
        }
    }

    async checkLocalhost() {
        const hostname = window.location.hostname;
        const protocol = window.location.protocol;
        const port = window.location.port;

        // Enhanced security checks
        const isLocalhost = hostname === 'localhost' ||
                           hostname === '127.0.0.1' ||
                           hostname === '::1';

        const isFileProtocol = protocol === 'file:';
        const isDevPort = port && ['3000', '8000', '5000', '8080'].includes(port);

        // Check for production domain patterns
        const isProductionDomain = hostname.includes('.com') ||
                                 hostname.includes('.org') ||
                                 hostname.includes('.net') ||
                                 hostname.includes('.io') ||
                                 hostname.includes('.github.io');

        const isDevelopment = isLocalhost || isFileProtocol || isDevPort;

        if (!isDevelopment || isProductionDomain) {
            // Log security violation attempt
            console.error('Admin panel access denied from:', {
                hostname,
                protocol,
                port,
                userAgent: navigator.userAgent,
                timestamp: new Date().toISOString()
            });

            throw new Error(`Admin panel access denied. Environment: ${hostname}:${port || 'default'} (${protocol}) - Only accessible in development environment for security.`);
        }

        console.log('Admin panel security check passed for development environment');
    }

    async loadData() {
        try {
            const response = await fetch('../data/content.json');
            if (!response.ok) throw new Error('Failed to load content data');
            this.data = await response.json();
        } catch (error) {
            throw new Error('Could not load content.json: ' + error.message);
        }
    }

    async loadLocales() {
        try {
            const [enResponse, itResponse] = await Promise.all([
                fetch('../data/locales/en.json'),
                fetch('../data/locales/it.json')
            ]);

            if (!enResponse.ok || !itResponse.ok) {
                throw new Error('Failed to load locale files');
            }

            this.locales.en = await enResponse.json();
            this.locales.it = await itResponse.json();
        } catch (error) {
            throw new Error('Could not load locale files: ' + error.message);
        }
    }

    initTabs() {
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabContents = document.querySelectorAll('.tab-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.dataset.tab;

                // Update button states
                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Update content states
                tabContents.forEach(content => {
                    content.classList.remove('active');
                    if (content.id === tabId) {
                        content.classList.add('active');
                    }
                });

                // Initialize specific tab functionality
                if (tabId === 'export-tab') {
                    this.initExportTab();
                }
            });
        });

        // Activate first tab by default
        if (tabButtons.length > 0) {
            tabButtons[0].click();
        }
    }

    initForms() {
        // Add change listeners to all form inputs
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('change', () => {
                this.unsavedChanges = true;
                this.updateSaveButtonState();
            });

            form.addEventListener('input', () => {
                this.unsavedChanges = true;
                this.updateSaveButtonState();
            });
        });

        // Prevent accidental page navigation
        window.addEventListener('beforeunload', (e) => {
            if (this.unsavedChanges) {
                e.preventDefault();
                e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
                return e.returnValue;
            }
        });
    }

    initEventListeners() {
        // Save button
        const saveBtn = document.getElementById('save-all');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => this.saveAllChanges());
        }

        // Load from file button
        const loadBtn = document.getElementById('load-from-file');
        if (loadBtn) {
            loadBtn.addEventListener('click', () => this.loadFromFile());
        }

        // Export buttons
        const exportJsonBtn = document.getElementById('export-json');
        if (exportJsonBtn) {
            exportJsonBtn.addEventListener('click', () => this.exportData('json'));
        }

        const exportCsvBtn = document.getElementById('export-csv');
        if (exportCsvBtn) {
            exportCsvBtn.addEventListener('click', () => this.exportData('csv'));
        }

        const generateLatexBtn = document.getElementById('generate-latex');
        if (generateLatexBtn) {
            generateLatexBtn.addEventListener('click', () => this.generateLatex());
        }

        const downloadLatexBtn = document.getElementById('download-latex');
        if (downloadLatexBtn) {
            downloadLatexBtn.addEventListener('click', () => this.downloadLatex());
        }

        // Dynamic list handlers
        this.initDynamicLists();

        // File input handlers
        this.initFileInputs();
    }

    initDynamicLists() {
        // Education list
        const addEducationBtn = document.getElementById('add-education');
        if (addEducationBtn) {
            addEducationBtn.addEventListener('click', () => this.addEducationItem());
        }

        // Experience list
        const addExperienceBtn = document.getElementById('add-experience');
        if (addExperienceBtn) {
            addExperienceBtn.addEventListener('click', () => this.addExperienceItem());
        }

        // Publications list
        const addPublicationBtn = document.getElementById('add-publication');
        if (addPublicationBtn) {
            addPublicationBtn.addEventListener('click', () => this.addPublicationItem());
        }

        // Skills list
        const addSkillBtn = document.getElementById('add-skill');
        if (addSkillBtn) {
            addSkillBtn.addEventListener('click', () => this.addSkillItem());
        }
    }

    initFileInputs() {
        const fileInput = document.getElementById('json-file-input');
        if (fileInput) {
            fileInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file && file.type === 'application/json') {
                    this.handleFileUpload(file);
                }
            });
        }
    }

    populateAllForms() {
        this.populatePersonalInfoForm();
        this.populateEducationList();
        this.populateExperienceList();
        this.populatePublicationsList();
        this.populateSkillsList();
        this.populateSettingsForm();
    }

    populatePersonalInfoForm() {
        const personal = this.data.personal;
        if (!personal) return;

        this.setFormValue('name', personal.name);
        this.setFormValue('email', personal.email);
        this.setFormValue('phone', personal.phone);
        this.setFormValue('location', personal.location);
        this.setFormValue('website', personal.website);
        this.setFormValue('linkedin', personal.linkedin);
        this.setFormValue('github', personal.github);
        this.setFormValue('orcid', personal.orcid);
        this.setFormValue('google-scholar', personal.googleScholar);
        this.setFormValue('bio-en', personal.bio?.en || '');
        this.setFormValue('bio-it', personal.bio?.it || '');
        this.setFormValue('research-interests-en', personal.researchInterests?.en || '');
        this.setFormValue('research-interests-it', personal.researchInterests?.it || '');
    }

    populateEducationList() {
        const educationList = document.getElementById('education-list');
        if (!educationList || !this.data.education) return;

        educationList.innerHTML = '';
        this.data.education.forEach((edu, index) => {
            this.addEducationItem(edu, index);
        });
    }

    populateExperienceList() {
        const experienceList = document.getElementById('experience-list');
        if (!experienceList || !this.data.experience) return;

        experienceList.innerHTML = '';
        this.data.experience.forEach((exp, index) => {
            this.addExperienceItem(exp, index);
        });
    }

    populatePublicationsList() {
        const publicationsList = document.getElementById('publications-list');
        if (!publicationsList || !this.data.publications) return;

        publicationsList.innerHTML = '';
        this.data.publications.forEach((pub, index) => {
            this.addPublicationItem(pub, index);
        });
    }

    populateSkillsList() {
        const skillsList = document.getElementById('skills-list');
        if (!skillsList || !this.data.skills) return;

        skillsList.innerHTML = '';
        this.data.skills.forEach((skill, index) => {
            this.addSkillItem(skill, index);
        });
    }

    populateSettingsForm() {
        // This would populate theme settings, language preferences, etc.
        // For now, we'll keep it simple
    }

    addEducationItem(data = null, index = null) {
        const educationList = document.getElementById('education-list');
        if (!educationList) return;

        const isNew = data === null;
        const itemIndex = index !== null ? index : educationList.children.length;

        const item = document.createElement('div');
        item.className = 'dynamic-item';
        item.innerHTML = `
            <div class="dynamic-item-header">
                <div class="dynamic-item-title">
                    ${isNew ? 'New Education Entry' : (data.degree || 'Education Entry')}
                </div>
                <div class="dynamic-item-actions">
                    <button type="button" class="btn btn-danger btn-small" onclick="this.closest('.dynamic-item').remove(); admin.markUnsaved();">
                        Remove
                    </button>
                </div>
            </div>
            <div class="form-grid">
                <div class="form-group">
                    <label>Degree</label>
                    <input type="text" name="education[${itemIndex}][degree]" value="${data?.degree || ''}" onchange="admin.markUnsaved();">
                </div>
                <div class="form-group">
                    <label>Institution</label>
                    <input type="text" name="education[${itemIndex}][institution]" value="${data?.institution || ''}" onchange="admin.markUnsaved();">
                </div>
                <div class="form-group">
                    <label>Year</label>
                    <input type="text" name="education[${itemIndex}][year]" value="${data?.year || ''}" onchange="admin.markUnsaved();">
                </div>
                <div class="form-group">
                    <label>Location</label>
                    <input type="text" name="education[${itemIndex}][location]" value="${data?.location || ''}" onchange="admin.markUnsaved();">
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea name="education[${itemIndex}][description]" onchange="admin.markUnsaved();">${data?.description || ''}</textarea>
                </div>
                <div class="form-group">
                    <label>Thesis (if applicable)</label>
                    <input type="text" name="education[${itemIndex}][thesis]" value="${data?.thesis || ''}" onchange="admin.markUnsaved();">
                </div>
            </div>
        `;

        educationList.appendChild(item);
        if (isNew) this.markUnsaved();
    }

    addExperienceItem(data = null, index = null) {
        const experienceList = document.getElementById('experience-list');
        if (!experienceList) return;

        const isNew = data === null;
        const itemIndex = index !== null ? index : experienceList.children.length;

        const item = document.createElement('div');
        item.className = 'dynamic-item';
        item.innerHTML = `
            <div class="dynamic-item-header">
                <div class="dynamic-item-title">
                    ${isNew ? 'New Experience Entry' : (data.position || 'Experience Entry')}
                </div>
                <div class="dynamic-item-actions">
                    <button type="button" class="btn btn-danger btn-small" onclick="this.closest('.dynamic-item').remove(); admin.markUnsaved();">
                        Remove
                    </button>
                </div>
            </div>
            <div class="form-grid">
                <div class="form-group">
                    <label>Position</label>
                    <input type="text" name="experience[${itemIndex}][position]" value="${data?.position || ''}" onchange="admin.markUnsaved();">
                </div>
                <div class="form-group">
                    <label>Company/Institution</label>
                    <input type="text" name="experience[${itemIndex}][company]" value="${data?.company || ''}" onchange="admin.markUnsaved();">
                </div>
                <div class="form-group">
                    <label>Start Date</label>
                    <input type="text" name="experience[${itemIndex}][startDate]" value="${data?.startDate || ''}" placeholder="YYYY-MM" onchange="admin.markUnsaved();">
                </div>
                <div class="form-group">
                    <label>End Date</label>
                    <input type="text" name="experience[${itemIndex}][endDate]" value="${data?.endDate || ''}" placeholder="YYYY-MM or 'Present'" onchange="admin.markUnsaved();">
                </div>
                <div class="form-group">
                    <label>Location</label>
                    <input type="text" name="experience[${itemIndex}][location]" value="${data?.location || ''}" onchange="admin.markUnsaved();">
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea name="experience[${itemIndex}][description]" onchange="admin.markUnsaved();">${data?.description || ''}</textarea>
                </div>
            </div>
        `;

        experienceList.appendChild(item);
        if (isNew) this.markUnsaved();
    }

    addPublicationItem(data = null, index = null) {
        const publicationsList = document.getElementById('publications-list');
        if (!publicationsList) return;

        const isNew = data === null;
        const itemIndex = index !== null ? index : publicationsList.children.length;

        const item = document.createElement('div');
        item.className = 'dynamic-item';
        item.innerHTML = `
            <div class="dynamic-item-header">
                <div class="dynamic-item-title">
                    ${isNew ? 'New Publication' : (data.title || 'Publication')}
                </div>
                <div class="dynamic-item-actions">
                    <button type="button" class="btn btn-danger btn-small" onclick="this.closest('.dynamic-item').remove(); admin.markUnsaved();">
                        Remove
                    </button>
                </div>
            </div>
            <div class="form-grid">
                <div class="form-group">
                    <label>Title</label>
                    <input type="text" name="publications[${itemIndex}][title]" value="${data?.title || ''}" onchange="admin.markUnsaved();">
                </div>
                <div class="form-group">
                    <label>Authors</label>
                    <input type="text" name="publications[${itemIndex}][authors]" value="${data?.authors || ''}" onchange="admin.markUnsaved();">
                </div>
                <div class="form-group">
                    <label>Journal/Venue</label>
                    <input type="text" name="publications[${itemIndex}][journal]" value="${data?.journal || ''}" onchange="admin.markUnsaved();">
                </div>
                <div class="form-group">
                    <label>Year</label>
                    <input type="number" name="publications[${itemIndex}][year]" value="${data?.year || ''}" onchange="admin.markUnsaved();">
                </div>
                <div class="form-group">
                    <label>Type</label>
                    <select name="publications[${itemIndex}][type]" onchange="admin.markUnsaved();">
                        <option value="article" ${data?.type === 'article' ? 'selected' : ''}>Article</option>
                        <option value="conference" ${data?.type === 'conference' ? 'selected' : ''}>Conference</option>
                        <option value="book" ${data?.type === 'book' ? 'selected' : ''}>Book</option>
                        <option value="chapter" ${data?.type === 'chapter' ? 'selected' : ''}>Chapter</option>
                        <option value="thesis" ${data?.type === 'thesis' ? 'selected' : ''}>Thesis</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>DOI</label>
                    <input type="text" name="publications[${itemIndex}][doi]" value="${data?.doi || ''}" onchange="admin.markUnsaved();">
                </div>
                <div class="form-group">
                    <label>URL</label>
                    <input type="url" name="publications[${itemIndex}][url]" value="${data?.url || ''}" onchange="admin.markUnsaved();">
                </div>
                <div class="form-group">
                    <label>Abstract</label>
                    <textarea name="publications[${itemIndex}][abstract]" onchange="admin.markUnsaved();">${data?.abstract || ''}</textarea>
                </div>
            </div>
        `;

        publicationsList.appendChild(item);
        if (isNew) this.markUnsaved();
    }

    addSkillItem(data = null, index = null) {
        const skillsList = document.getElementById('skills-list');
        if (!skillsList) return;

        const isNew = data === null;
        const itemIndex = index !== null ? index : skillsList.children.length;

        const item = document.createElement('div');
        item.className = 'dynamic-item';
        item.innerHTML = `
            <div class="dynamic-item-header">
                <div class="dynamic-item-title">
                    ${isNew ? 'New Skill' : (data.name || 'Skill')}
                </div>
                <div class="dynamic-item-actions">
                    <button type="button" class="btn btn-danger btn-small" onclick="this.closest('.dynamic-item').remove(); admin.markUnsaved();">
                        Remove
                    </button>
                </div>
            </div>
            <div class="form-grid">
                <div class="form-group">
                    <label>Skill Name</label>
                    <input type="text" name="skills[${itemIndex}][name]" value="${data?.name || ''}" onchange="admin.markUnsaved();">
                </div>
                <div class="form-group">
                    <label>Category</label>
                    <input type="text" name="skills[${itemIndex}][category]" value="${data?.category || ''}" onchange="admin.markUnsaved();">
                </div>
                <div class="form-group">
                    <label>Level</label>
                    <select name="skills[${itemIndex}][level]" onchange="admin.markUnsaved();">
                        <option value="beginner" ${data?.level === 'beginner' ? 'selected' : ''}>Beginner</option>
                        <option value="intermediate" ${data?.level === 'intermediate' ? 'selected' : ''}>Intermediate</option>
                        <option value="advanced" ${data?.level === 'advanced' ? 'selected' : ''}>Advanced</option>
                        <option value="expert" ${data?.level === 'expert' ? 'selected' : ''}>Expert</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Years of Experience</label>
                    <input type="number" name="skills[${itemIndex}][years]" value="${data?.years || ''}" min="0" onchange="admin.markUnsaved();">
                </div>
            </div>
        `;

        skillsList.appendChild(item);
        if (isNew) this.markUnsaved();
    }

    setFormValue(name, value) {
        const input = document.querySelector(`[name="${name}"], #${name}`);
        if (input) {
            input.value = value || '';
        }
    }

    markUnsaved() {
        this.unsavedChanges = true;
        this.updateSaveButtonState();
    }

    updateSaveButtonState() {
        const saveBtn = document.getElementById('save-all');
        if (saveBtn) {
            if (this.unsavedChanges) {
                saveBtn.classList.remove('btn-secondary');
                saveBtn.classList.add('btn-primary');
                saveBtn.textContent = '💾 Save Changes';
            } else {
                saveBtn.classList.remove('btn-primary');
                saveBtn.classList.add('btn-secondary');
                saveBtn.textContent = '✓ All Saved';
            }
        }
    }

    async saveAllChanges() {
        try {
            this.showProgress(true);

            // Collect all form data
            this.collectFormData();

            // Simulate save (in a real implementation, you'd send to a server)
            await this.simulateSave();

            this.unsavedChanges = false;
            this.updateSaveButtonState();
            this.showStatus('All changes saved successfully!', 'success');

        } catch (error) {
            console.error('Save failed:', error);
            this.showStatus('Failed to save changes: ' + error.message, 'error');
        } finally {
            this.showProgress(false);
        }
    }

    collectFormData() {
        // Collect personal info
        this.data.personal = {
            ...this.data.personal,
            name: this.getFormValue('name'),
            email: this.getFormValue('email'),
            phone: this.getFormValue('phone'),
            location: this.getFormValue('location'),
            website: this.getFormValue('website'),
            linkedin: this.getFormValue('linkedin'),
            github: this.getFormValue('github'),
            orcid: this.getFormValue('orcid'),
            googleScholar: this.getFormValue('google-scholar'),
            bio: {
                en: this.getFormValue('bio-en'),
                it: this.getFormValue('bio-it')
            },
            researchInterests: {
                en: this.getFormValue('research-interests-en'),
                it: this.getFormValue('research-interests-it')
            }
        };

        // Collect dynamic lists
        this.data.education = this.collectDynamicListData('education');
        this.data.experience = this.collectDynamicListData('experience');
        this.data.publications = this.collectDynamicListData('publications');
        this.data.skills = this.collectDynamicListData('skills');
    }

    collectDynamicListData(listType) {
        const items = [];
        const listElement = document.getElementById(`${listType}-list`);
        if (!listElement) return items;

        const dynamicItems = listElement.querySelectorAll('.dynamic-item');
        dynamicItems.forEach((item, index) => {
            const itemData = {};
            const inputs = item.querySelectorAll('input, textarea, select');

            inputs.forEach(input => {
                const name = input.name;
                if (name) {
                    const field = name.split('[')[2]?.replace(']', ''); // Extract field name
                    if (field) {
                        itemData[field] = input.value;
                    }
                }
            });

            if (Object.keys(itemData).length > 0) {
                items.push(itemData);
            }
        });

        return items;
    }

    getFormValue(name) {
        const input = document.querySelector(`[name="${name}"], #${name}`);
        return input ? input.value : '';
    }

    async simulateSave() {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // In a real implementation, you would:
        // 1. Send data to a server endpoint
        // 2. Validate the data
        // 3. Update the JSON files
        // 4. Return success/error response

        // For now, just log the data
        console.log('Saving data:', this.data);
    }

    async loadFromFile() {
        const fileInput = document.getElementById('json-file-input');
        if (fileInput) {
            fileInput.click();
        }
    }

    async handleFileUpload(file) {
        try {
            const text = await file.text();
            const jsonData = JSON.parse(text);

            // Validate the data structure
            if (!this.validateJsonStructure(jsonData)) {
                throw new Error('Invalid JSON structure');
            }

            this.data = jsonData;
            this.populateAllForms();
            this.markUnsaved();
            this.showStatus('Data loaded from file successfully', 'success');

        } catch (error) {
            this.showStatus('Failed to load file: ' + error.message, 'error');
        }
    }

    validateJsonStructure(data) {
        // Basic validation - you could make this more comprehensive
        return data && typeof data === 'object' && data.personal;
    }

    async exportData(format) {
        try {
            let content, filename, mimeType;

            if (format === 'json') {
                content = JSON.stringify(this.data, null, 2);
                filename = 'content-export.json';
                mimeType = 'application/json';
            } else if (format === 'csv') {
                content = this.generateCSV();
                filename = 'content-export.csv';
                mimeType = 'text/csv';
            }

            this.downloadFile(content, filename, mimeType);
            this.showStatus(`Data exported as ${format.toUpperCase()}`, 'success');

        } catch (error) {
            this.showStatus('Export failed: ' + error.message, 'error');
        }
    }

    generateCSV() {
        // Simple CSV generation for publications
        if (!this.data.publications) return '';

        const headers = ['Title', 'Authors', 'Journal', 'Year', 'Type', 'DOI'];
        const rows = [headers.join(',')];

        this.data.publications.forEach(pub => {
            const row = [
                this.csvEscape(pub.title),
                this.csvEscape(pub.authors),
                this.csvEscape(pub.journal),
                pub.year,
                pub.type,
                this.csvEscape(pub.doi)
            ];
            rows.push(row.join(','));
        });

        return rows.join('\n');
    }

    csvEscape(str) {
        if (!str) return '';
        const escaped = str.toString().replace(/"/g, '""');
        return `"${escaped}"`;
    }

    downloadFile(content, filename, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        URL.revokeObjectURL(url);
    }

    initExportTab() {
        // Initialize LaTeX preview if needed
        const latexPreview = document.getElementById('latex-preview');
        if (latexPreview && !latexPreview.textContent.trim()) {
            this.generateLatexPreview();
        }
    }

    generateLatex() {
        try {
            const latex = this.generateLatexContent();
            const preview = document.getElementById('latex-preview');
            if (preview) {
                preview.textContent = latex;
            }
            this.showStatus('LaTeX CV generated successfully', 'success');
        } catch (error) {
            this.showStatus('Failed to generate LaTeX: ' + error.message, 'error');
        }
    }

    generateLatexPreview() {
        const preview = document.getElementById('latex-preview');
        if (preview) {
            preview.textContent = 'Click "Generate LaTeX CV" to create a preview...';
        }
    }

    generateLatexContent() {
        const personal = this.data.personal || {};
        const education = this.data.education || [];
        const experience = this.data.experience || [];
        const publications = this.data.publications || [];
        const skills = this.data.skills || [];

        return `\\documentclass[11pt,a4paper]{moderncv}
\\moderncvstyle{classic}
\\moderncvcolor{blue}
\\usepackage[utf8]{inputenc}
\\usepackage[scale=0.75]{geometry}

\\name{${personal.name || ''}}{}
\\title{${personal.bio?.en || ''}}
\\address{${personal.location || ''}}{}{}
\\phone[mobile]{${personal.phone || ''}}
\\email{${personal.email || ''}}
\\homepage{${personal.website || ''}}
\\social[linkedin]{${personal.linkedin ? personal.linkedin.replace('https://linkedin.com/in/', '') : ''}}
\\social[github]{${personal.github ? personal.github.replace('https://github.com/', '') : ''}}

\\begin{document}
\\makecvtitle

\\section{Education}
${education.map(edu =>
`\\cventry{${edu.year}}{${edu.degree}}{${edu.institution}}{${edu.location}}{}{${edu.description || ''}}`
).join('\n')}

\\section{Experience}
${experience.map(exp =>
`\\cventry{${exp.startDate}--${exp.endDate}}{${exp.position}}{${exp.company}}{${exp.location}}{}{${exp.description || ''}}`
).join('\n')}

\\section{Publications}
${publications.slice(0, 10).map(pub =>
`\\cvitem{${pub.year}}{\\textbf{${pub.title}} ${pub.authors}. \\emph{${pub.journal}}, ${pub.year}.}`
).join('\n')}

\\section{Skills}
${skills.map(skill =>
`\\cvitem{${skill.category}}{${skill.name} (${skill.level})}`
).join('\n')}

\\end{document}`;
    }

    downloadLatex() {
        try {
            const latex = this.generateLatexContent();
            this.downloadFile(latex, 'cv.tex', 'text/plain');
            this.showStatus('LaTeX file downloaded successfully', 'success');
        } catch (error) {
            this.showStatus('Failed to download LaTeX: ' + error.message, 'error');
        }
    }

    showStatus(message, type = 'success') {
        const statusEl = document.getElementById('status-message');
        if (statusEl) {
            statusEl.className = `status-message ${type}`;
            statusEl.textContent = message;
            statusEl.style.display = 'block';

            setTimeout(() => {
                statusEl.style.display = 'none';
            }, 5000);
        }
    }

    showProgress(show) {
        const progressBar = document.getElementById('progress-bar');
        if (progressBar) {
            if (show) {
                progressBar.style.display = 'block';
                const fill = progressBar.querySelector('.progress-fill');
                if (fill) {
                    fill.style.width = '100%';
                }
            } else {
                setTimeout(() => {
                    progressBar.style.display = 'none';
                    const fill = progressBar.querySelector('.progress-fill');
                    if (fill) {
                        fill.style.width = '0%';
                    }
                }, 500);
            }
        }
    }
}

// Global reference for inline event handlers
let admin;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    admin = new AdminPanel();
});

// Make admin globally accessible for inline handlers
window.admin = admin;