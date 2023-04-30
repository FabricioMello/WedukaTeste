using System.ComponentModel.DataAnnotations;

namespace PessoasAPI.Models
{
    public class Pessoa
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "O campo CPF é obrigatório")]
        [StringLength(11, MinimumLength = 11, ErrorMessage = "O campo CPF deve conter 11 caracteres")]
        public string Cpf { get; set; }

        [Required(ErrorMessage = "O campo Nome é obrigatório")]
        [StringLength(200, MinimumLength = 3, ErrorMessage = "O campo Nome deve ter entre 3 e 200 caracteres")]
        public string Nome { get; set; }

        public ICollection<Contato> Contatos { get; set; }
    }
}
