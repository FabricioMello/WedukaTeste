using Microsoft.EntityFrameworkCore;
using PessoasAPI.Models;

namespace PessoasAPI.Data
{
    public class APIDbContext : DbContext
    {
        public APIDbContext(DbContextOptions<APIDbContext> options) : base(options)
        { 
        
        }

        public DbSet<Pessoa> Pessoa { get; set; }
        public DbSet<Contato> Contato { get; set; }
    }
}
