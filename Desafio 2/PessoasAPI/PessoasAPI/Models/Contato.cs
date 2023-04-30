using PessoasAPI.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PessoasAPI.Models
{
    public class Contato
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int PessoaId { get; set; }

        [Required]
        public TipoContato Tipo { get; set; }

        [Required]
        public string Valor { get; set; }

    }
}
