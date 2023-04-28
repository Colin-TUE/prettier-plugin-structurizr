workspace "Test Workspace" {
    model {
        !include path_to_folder

        obiWan = person "Obi-Wan Kenobi" {
            description "Jedi Master and High Jedi General within the Third Systems Army and the 7th Sky Corps."
        }
        cody = person "Commander Cody - CC-2224" {
            description "Clone Marshal Commander in the Grand Army of the Republic who commanded the 7th Sky Corps"
        }
        grievous = person "General Grievous" {
            description "Kaleesh male warlord turned cyborg and Supreme Martial Commander of the Separatist Droid Armies"
        }
        b1 = person "B1 Battle Droid"
        asajj = person "Asajj Ventress" {
            description "Commander in the Separatist droid military and an assassin in the employ of the Sith"
        }

        utapau = softwareSystem "Utapau" {
            description "A remote, subterranean planet located in the Utapau system of the Tarabba sector in the Outer Rim Territories"

            separatistHangar = container "Separatist Hangar" {
            }
        }

        obiWan -> utapau "Traveled to"
        obiWan -> grievous "Engaged"
        obiWan -> asajj "Engaged"
        grievous -> b1 "Ordered to stand down"
        grievous -> obiWan "Killed by"
        cody -> utapau "Laid under sieged"
        cody -> b1 "Shot"
    }
    views {
        properties {
            "structurizr.sort" "key"
        }

        systemLandscape "Hello there" {
            title "Hello There"
            description "All services, components, and infrastructure."

            include obiWan->
            exclude relationship.source==tmp

            autoLayout tb 200 100
        }

        systemContext utapau "General Grievous" {
            title "Context Overview for General Grievous"

            include *
            // Include all the interactions from the persons present in our systems/environment/context
            include ->obiWan->
            include ->grievous->

            // Exclude persons not present on this system
            exclude asajj

            autoLayout rl 200 100
        }

        container b1 "B1 Battle Droid" {
            title "B1 Battle Droid"

            autoLayout bt 200 100
        }

        theme https://starwars.fandom.com/wiki/Droid_march
    }
}