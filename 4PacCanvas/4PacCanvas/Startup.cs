using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(_4PacCanvas.Startup))]

namespace _4PacCanvas
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
        }
    }
}
