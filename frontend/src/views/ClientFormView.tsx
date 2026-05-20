import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClients } from '../controllers/useClients';
import { useOnboarding } from '../controllers/useOnboarding';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import styles from './ClientFormView.module.css';

interface FormData {
  company_name: string;
  contact_name: string;
  email: string;
  phone: string;
  plan: string;
  start_date: string;
  consultant_name: string;
}

const INITIAL_FORM: FormData = {
  company_name: '',
  contact_name: '',
  email: '',
  phone: '',
  plan: 'Básico',
  start_date: new Date().toISOString().split('T')[0],
  consultant_name: '',
};

function ClientFormView() {
  const navigate = useNavigate();
  const { loading, error, createClient } = useClients();
  const { createSteps } = useOnboarding();
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!form.company_name.trim()) {
      newErrors.company_name = 'Nome da empresa é obrigatório';
    }
    if (!form.contact_name.trim()) {
      newErrors.contact_name = 'Nome do responsável é obrigatório';
    }
    if (!form.email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'E-mail inválido';
    }
    if (!form.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório';
    }
    if (!form.consultant_name.trim()) {
      newErrors.consultant_name = 'Consultor responsável é obrigatório';
    }
    if (!form.start_date) {
      newErrors.start_date = 'Data de início é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setSubmitting(true);
    try {
      const client = await createClient(form);
      await createSteps(client.id);
      navigate(`/onboarding/${client.id}`);
    } catch {
      // Erro já tratado no hook
    } finally {
      setSubmitting(false);
    }
  };

  if (submitting) {
    return (
      <LoadingSpinner message="Cadastrando cliente e criando checklist..." />
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Cadastrar Novo Cliente</h2>
      <p className={styles.subtitle}>
        Preencha os dados do cliente para iniciar o processo de onboarding
      </p>

      {error && <ErrorMessage message={error} />}

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.grid}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="company_name">
              Nome da Empresa *
            </label>
            <input
              id="company_name"
              name="company_name"
              className={`${styles.input} ${errors.company_name ? styles.inputError : ''}`}
              type="text"
              placeholder="Ex: Empresa ABC Ltda"
              value={form.company_name}
              onChange={handleChange}
            />
            {errors.company_name && (
              <span className={styles.error}>{errors.company_name}</span>
            )}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="contact_name">
              Responsável de Contato *
            </label>
            <input
              id="contact_name"
              name="contact_name"
              className={`${styles.input} ${errors.contact_name ? styles.inputError : ''}`}
              type="text"
              placeholder="Nome do contato"
              value={form.contact_name}
              onChange={handleChange}
            />
            {errors.contact_name && (
              <span className={styles.error}>{errors.contact_name}</span>
            )}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="email">
              E-mail *
            </label>
            <input
              id="email"
              name="email"
              className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
              type="email"
              placeholder="email@empresa.com"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && (
              <span className={styles.error}>{errors.email}</span>
            )}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="phone">
              Telefone *
            </label>
            <input
              id="phone"
              name="phone"
              className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
              type="tel"
              placeholder="(11) 99999-9999"
              value={form.phone}
              onChange={handleChange}
            />
            {errors.phone && (
              <span className={styles.error}>{errors.phone}</span>
            )}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="plan">
              Plano Contratado *
            </label>
            <select
              id="plan"
              name="plan"
              className={styles.select}
              value={form.plan}
              onChange={handleChange}
            >
              <option value="Básico">Básico</option>
              <option value="Pro">Pro</option>
              <option value="Enterprise">Enterprise</option>
            </select>
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="start_date">
              Data de Início *
            </label>
            <input
              id="start_date"
              name="start_date"
              className={`${styles.input} ${errors.start_date ? styles.inputError : ''}`}
              type="date"
              value={form.start_date}
              onChange={handleChange}
            />
            {errors.start_date && (
              <span className={styles.error}>{errors.start_date}</span>
            )}
          </div>

          <div className={`${styles.field} ${styles.fieldFull}`}>
            <label className={styles.label} htmlFor="consultant_name">
              Consultor Responsável *
            </label>
            <input
              id="consultant_name"
              name="consultant_name"
              className={`${styles.input} ${errors.consultant_name ? styles.inputError : ''}`}
              type="text"
              placeholder="Nome do consultor Maiver"
              value={form.consultant_name}
              onChange={handleChange}
            />
            {errors.consultant_name && (
              <span className={styles.error}>{errors.consultant_name}</span>
            )}
          </div>
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={() => navigate('/')}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading || submitting}
          >
            {submitting ? 'Cadastrando...' : 'Cadastrar Cliente'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ClientFormView;
