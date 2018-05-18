import { NgModule } from '@angular/core';
import { PostPageComponent } from './post-page/post-page';

import { CustomTabsComponent } from './custom-tabs/custom-tabs';

@NgModule({
	declarations: [PostPageComponent,
    CustomTabsComponent,
    ],
	imports: [],
	exports: [PostPageComponent,
    CustomTabsComponent,
    ]
})
export class ComponentsModule {}
